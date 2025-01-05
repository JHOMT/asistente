function activa() {
    if (typeof annyang !== 'undefined') {
        const utter = new SpeechSynthesisUtterance();
        let voices = [];

        utter.rate = 1;
        utter.pitch = 0.8;
        utter.lang = 'es-ES';

        function cargarVoces() {
            voices = window.speechSynthesis.getVoices();
            if (voices.length === 0) {
                window.speechSynthesis.onvoiceschanged = () => {
                    voices = window.speechSynthesis.getVoices();
                };
            }
        }
        cargarVoces();

        function speak(text = 0) {
            utter.text = text;
            if (voices.length > 0) {
                utter.voice = voices[4] || voices[0];
            }
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utter);
        }

        const jokeArray = [
            "¿Qué hace una abeja en el gimnasio? ¡Zumba!",
            "¿Por qué el libro de matemáticas está triste? Porque tiene demasiados problemas.",
            "¿Cuál es el pez más divertido? El pez payaso.",
        ];

        function obtenerHoraYFecha() {
            const hora = new Date().toLocaleTimeString();
            const fecha = new Date().toLocaleDateString();
            return `Son las ${hora} del día ${fecha}.`;
        }

        async function obtenerNoticias() {
            try {
                const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=c93c0bdf1ca04805b1032cb2dbd2338e');
                const data = await response.json();
                return data.articles.slice(0, 3).map(noticia => `${noticia.title}. ${noticia.description}`).join(' ');
            } catch {
                return 'Lo siento, no pude obtener las noticias.';
            }
        }

        async function obtenerClima() {
            try {
                const { coords } = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
                const { latitude, longitude } = coords;
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                const data = await response.json();
                return `La temperatura actual es de ${data.current_weather.temperature} grados Celsius y el clima es ${data.current_weather.weathercode}.`;
            } catch {
                return 'No pude obtener el clima.';
            }
        }

        async function obtenerUbicacion() {
            try {
                const { coords } = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
                const { latitude, longitude } = coords;
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                const data = await response.json();
                return `Estamos en ${data.display_name}.`;
            } catch {
                return 'No pude obtener tu ubicación.';
            }
        }

        function captureResponse(callback) {
            annyang.addCallback('result', function (phrases) {
                console.log("Respuesta capturada: ", phrases[0]);
                annyang.removeCallback('result');
                callback(phrases[0]);
            });
        }

        const commands = {
            'saluda': () => {
                speak('¿A quién debo saludar, señor?');
                captureResponse((nombre) => {
                    speak(`¡Hola, ${nombre}! Espero que tengas un excelente día.`);
                });
            },

            'Hola': () => {
                speak('Hola, ¿en qué puedo ayudarte?');
            },

            'hora': () => {
                speak(obtenerHoraYFecha());
            },

            'noticias': async () => {
                const noticias = await obtenerNoticias();
                speak(noticias);
            },

            'clima': async () => {
                const clima = await obtenerClima();
                speak(clima);
            },

            'direccion': async () => {
                const ubicacion = await obtenerUbicacion();
                speak(ubicacion);
            },

            'musica': () => {
                speak('Abriendo YouTube. Espero que esta música sea de tu agrado.');
                window.open('https://www.youtube.com/watch?v=WWUoq4RtHV0&t=3898s', '_blank');
            },

            'spotify': () => {
                speak('Abriendo Spotify, Que disfrute de la musica señor.');
                window.location.href = 'spotify:track:https://open.spotify.com/track/1Rl25VpYAmwet3uJrBBVbF?si=110abcb25a204161';
            },

            'investigar': () => {
                speak('¿Qué tema deseas investigar?');
                captureResponse((tema) => {
                    window.open(`https://www.google.com/search?q=${encodeURIComponent(tema)}`, '_blank');
                    speak(`Buscando información sobre ${tema}.`);
                });
            },

            'broma': () => {
                const randomJoke = jokeArray[Math.floor(Math.random() * jokeArray.length)];
                speak(randomJoke);
            },

            'estado del sistema': () => {
                const memoria = performance.memory ? ((performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100).toFixed(2) : 'N/A';
                speak(`El uso de memoria actual es de ${memoria}%.`);
            },

            'como te llamas': () => {
                speak('Soy Jarvis, tu asistente virtual.');
            },

            'despedida': () => {
                speak('Adiós, señor. Estaré aquí cuando me necesite.');
            },

            'gracias': () => {
                speak('¡De nada, señor! Siempre a su servicio.');
            },

            'reiniciar': () => {
                speak('Reiniciando comandos...');
                annyang.abort();
                setTimeout(() => annyang.start(), 1000);
            },

            'abrir *pagina': (pagina) => {
                if (pagina) {
                    const url = `https://${pagina}`;
                    speak(`Abriendo ${pagina}`);
                    window.open(url, '_blank');
                } else {
                    speak("No pude entender el nombre de la página. ¿Podrías repetirlo?");
                }
            },

            'buscar imagen de *tema': (tema) => {
                if (tema) {
                    speak(`Buscando imágenes de ${tema}.`);
                    window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(tema)}`, '_blank');
                } else {
                    speak("No pude entender el tema. ¿Podrías repetirlo?");
                }
            },

            'leer *articulo': (articulo) => {
                speak(`Voy a leer el artículo: ${articulo}`);
                window.open(`https://www.google.com/search?q=${encodeURIComponent(articulo)}`, '_blank');
            },

            'volumen *nivel': (nivel) => {
                const vol = parseInt(nivel, 10);
                if (isNaN(vol) || vol < 0 || vol > 100) {
                    speak('Por favor, dime un nivel de volumen entre 0 y 100.');
                } else {
                    speak(`Ajustando volumen al ${vol}%.`);
                }
            },

            'buscar definición de *palabra': (palabra) => {
                speak(`Buscando la definición de ${palabra}.`);
                window.open(`https://www.google.com/search?q=definición+${encodeURIComponent(palabra)}`, '_blank');
            },

            'abrir *app': (app) => {
                if (app.toLowerCase() === 'whatsapp') {
                    speak('Abriendo WhatsApp.');
                    window.open('https://web.whatsapp.com/', '_blank');
                } else {
                    speak(`No reconozco la aplicación ${app}.`);
                }
            },

        };

        setInterval(() => {
            annyang.abort();
            annyang.start();
            console.log('Reiniciando Annyang...');
        }, 60000);

        annyang.addCommands(commands);
        annyang.start({ autoRestart: true, continuous: true });

        speak('Jarvis activado, ¿en qué puedo ayudarle hoy?');
    } else {
        console.error("Annyang no es compatible con este navegador.");
        speak('Lo siento, no puedo ejecutar comandos de voz en este navegador.');
    }
}