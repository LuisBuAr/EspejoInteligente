/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
	address: "0.0.0.0", 	// Address to listen on, can be:
		// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
		// - another specific IPv4/6 to listen on a specific interface
		// - "0.0.0.0", "::" to listen on any interface
		// Default, when address config is left out or empty, is "localhost"
	port: puerto,
	basePath: "/",
// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "ip"], 
// Set [] to allow all IP addresses
											
// or add a specific IPv4 of 192.168.1.5 :
												
// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
												
// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
												
// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 	// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",
// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 
// HTTPS Certificate path, only require when useHttps is true

	language: "es",
	locale: "es-SP",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"],
 // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar",
		},
		{
			module: "clock",
			position: "top_center",
		},
		{
			module: "calendar",
			header: "Festivos de España",
			position: "bottom_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "webcal://www.calendarlabs.com/ical-calendar/ics/70/Spain_Holidays.ics"
					}
				]
			}
		},
		{
			module: "compliments",
			position: "middle_center",
		},
		{
			module: "weather",
			position: "bottom_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Madrid",
				locationID: "3117735", // ID de http://bulk.openweathermap.org/sample/city.list.json.gz; descomprime el archivo gz y encuentra tu ciudad
				apiKey: "apikey obtenida del Usuario en openweathermap"
			}
		},{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "El Pais",
						url: "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada",
					},
					{
						title: "ABC",
						url: "https://www.abc.es/rss/feeds/abcPortada.xml",
					},
					{
						title: "El Mundo",
						url: "https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml",
					},
					{
						title: "ElDiario.es",
						url: "https://www.eldiario.es/rss",
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}},
					{
			module: "MMM-DHT-Sensor",
			position: "middle_center",
			header: "Temperatura y Humedad del cuarto",
			config: {
				sensorPin: 2,
				sensorType: 11,
				updateInterval: 60* 1000,
				initialLoadDelay: 0,
				animationSpeed: 100,
				units: "metric",
				relativeScale: 35,
				debug: false
			}
		},
				{
			module: 'MMM-AQI',
			position: 'bottom_left',
			header: 'Air Quality Index (AQI)',
			config: {
				token: "token obtenido de la web",
				city: "Madrid",
				iaqi: true,
				updateInterval: 30 * 60 * 1000, // Cada media hora
				initialLoadDelay: 0,
				animationSpeed: 1000,
				debug: false
			}
			},{
			module: "mmm-hue-lights",
			position: "bottom_right",
			config: {
				bridgeIp: ‘ip de Hue Bridge’,
				user: ‘ususario asignado’
			}
		},{
		  module: 'MMM-JsonTable',
		  carouselId:"MMM-JsonTable1",
		  position: 'bottom_right',
		  header: 'Estado del parking',
		  config: {
			url: 'http:// ip:puerto /modules/Estado_del_parking.json', 
// Required
			arrayName: 'Estado_del_parking'
		  }
		},
		{
		  module: 'MMM-JsonTable',
		  carouselId:"MMM-JsonTable2",
		  header:'Información económica',
		  position: 'bottom_center',
		  config: {
			size: 3,
			url: 'http://ip:puerto/modules/A_abonar_check_out_ofertas.json', // Required
			arrayName: 'A_abonar_check_out_ofertas'
		  }
		},
		{
		  module: 'MMM-JsonTable',
		  carouselId:"MMM-JsonTable3",
		  header:'Menu del dia',
		  position: 'top_center',
		  config: {
			  size: 1,
			url: 'http:// ip:puerto /modules/Menu_del_dia.json',
// Required
			arrayName: 'Menu_del_dia'
		  }
		},
		{
		  module: 'MMM-JsonTable4',
		  header:'Persiana',
		  position: 'bottom_left',
		  config: {
			size: 1,
			url:'http:// ip:puerto /modules/Persiana.json',// Required
			arrayName: 'Persiana'
		  }
		},
		{
			module: 'MMM-KeyBindings',
    		config: {
				evdev: { enabled: false },
        		enableKeyboard: true
			},
		},
		{
		module: 'MMM-Carousel',
		position: 'bottom_bar', // Required only for navigation controls
		config: {
			transitionInterval: 1000000000,
			mode: 'slides',
			showPageIndicators: true,
			showPageControls: false,
			slides: {
				main: ['clock', 'weather','calendar','compliments','newsfeed'],
				"Slide 1": ['clock', 'MMM-DHT-Sensor','mmm-hue-lights',"MMM-JsonTable4"],
				"Slide 2": ['MMM-AQI',
				{name:'MMM-JsonTable',carouselId:"MMM-JsonTable1"},
				{name:'MMM-JsonTable',carouselId:"MMM-JsonTable2"},
				{name:'MMM-JsonTable',carouselId:"MMM-JsonTable3"},
				'clock'],
			},
			keyBindings: { 
				enabled: true,
				enableKeyboard: true,
				mode: "DEFAULT",
				map: {
					NextSlide: "ArrowRight", 
					PrevSlide: "ArrowLeft", 
					Slide0:    "Home"
				},
				
			}},
		},
		
	]


};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
