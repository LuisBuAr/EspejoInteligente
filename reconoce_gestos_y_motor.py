import cv2
import mediapipe as mp
import pyautogui
import time
import RPi.GPIO as GPIO
from time import sleep
import json

GPIO.setwarnings(False)

# Motor
in1 = 6
in2 = 5
en_a = 13
GPIO.setmode(GPIO.BCM)
GPIO.setup(in1,GPIO.OUT)
GPIO.setup(in2,GPIO.OUT)
GPIO.setup(en_a,GPIO.OUT)

q=GPIO.PWM(en_a,5)
q.start(75)

GPIO.output(in1,GPIO.LOW)
GPIO.output(in2,GPIO.LOW)
motorMove=0
##################################
printHand=0
pyautogui.PAUSE = 0.01
mp_drawing = mp.solutions.drawing_utils
mp_hands = mp.solutions.hands
##################################
tipIds = [4, 8, 12, 16, 20]
state = None
Gesture = None
wCam, hCam = 320, 240
############################
def fingerPosition(image, handNo=0):
    lmList = []
    if results.multi_hand_landmarks:
        myHand = results.multi_hand_landmarks[handNo]
        for id, lm in enumerate(myHand.landmark):
            # print(id,lm)
            h, w, c = image.shape
            cx, cy = int(lm.x * w), int(lm.y *  h)
            lmList.append([id, cx, cy])
    return lmList
# For webcam input:
cap=cv2.VideoCapture(0)
cap.set(3, wCam)
cap.set(4, hCam)
with mp_hands.Hands(
    min_detection_confidence=0.8,
    min_tracking_confidence=0.5) as hands:
  while cap.isOpened():
    success, image = cap.read()
    if not success:
        print("Ignoring empty camera frame.")
      # If loading a video, use 'break' instead of 'continue'.
        break
    # Flip the image horizontally for a later selfie-view display, and convert
    # the BGR image to RGB.
    image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    results = hands.process(image)
    # Draw the hand annotations on the image.
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    if results.multi_hand_landmarks:
      for hand_landmarks in results.multi_hand_landmarks:
        mp_drawing.draw_landmarks(
            image, hand_landmarks, mp_hands.HAND_CONNECTIONS)
    lmList = fingerPosition(image)
    if len(lmList) != 0:
        fingers = []
        for id in range(1, 5):
            if lmList[tipIds[id]][2] < lmList[tipIds[id] - 2][2]:
                #state = "Play"
                fingers.append(1)
            if (lmList[tipIds[id]][2] > lmList[tipIds[id] - 2][2] ):
               # state = "Pause"
               # pyautogui.press('space')
               # print("Space")
                fingers.append(0)
        totalFingers = fingers.count(1)
        #print(totalFingers)
        #print(lmList[8][1])
        

        if totalFingers == 4:
            state = "Play"
           # fingers.append(1)
        if totalFingers == 0 and state == "Play":
            state = "Pause"
            #pyautogui.press('space')
            #print("Space")
        if totalFingers == 1:
            if lmList[8][1]<80 and printHand!=1:
                printHand=1
                print("left")
                pyautogui.press('left') 
            if lmList[8][1]>240 and printHand!=2:
                printHand=2
                print("Right")  
                pyautogui.press('Right')
            if lmList[8][1]<240 and lmList[8][1]>80:
                printHand=0
        if totalFingers == 2:
            if lmList[8][1]<80 and motorMove!=1:
                motorMove=1
                GPIO.output(in1,GPIO.HIGH)
                GPIO.output(in2,GPIO.LOW)

                print("Subiendo")

                # Open the JSON file
                with open('/home/pi/EspejoInteligente/MagicMirror/modules/Persiana.json', 'r') as f:
                    # Load the JSON data
                    json_data = json.load(f)
            
                # Change the value to "Bajada"
                json_data["Persiana"][0]["value"] = "Subida"

                # Write the updated JSON data back to the file
                with open('/home/pi/EspejoInteligente/MagicMirror/modules/Persiana.json', 'w') as f:
                     json.dump(json_data, f)

                print('Json subida')
 
            if lmList[8][1]>240 and motorMove!=2:
                motorMove=2
                GPIO.output(in1,GPIO.LOW)
                GPIO.output(in2,GPIO.HIGH)

                print('Bajando')
         
                # Open the JSON file
                with open('/home/pi/EspejoInteligente/MagicMirror/modules/Persiana.json', 'r') as Persiana:
                   # Load the JSON data
                   json_data = json.load(Persiana)

                # Change the value to "Bajada"
                json_data["Persiana"][0]["value"] = "Bajada"

                # Write the updated JSON data back to the file
                with open('/home/pi/EspejoInteligente/MagicMirror/modules/Persiana.json', 'w') as Persiana:
                    json.dump(json_data, Persiana)

                print('Json bajada')
            if lmList[8][1]<240 and lmList[8][1]>80 and motorMove!=0:
                motorMove=0
                GPIO.output(in1,GPIO.LOW)
                GPIO.output(in2,GPIO.LOW)
         
                print('Stop')

    #cv2.putText(image, str("Gesture"), (10,40), cv2.FONT_HERSHEY_SIMPLEX,
    #              1, (255, 0, 0), 2)
    cv2.imshow("Media Controller", image)
    key = cv2.waitKey(1) & 0xFF
    # if the `q` key was pressed, break from the loop
    if key == ord("q"):
        break
  cv2.destroyAllWindows()
