function activa(){  
    if (typeof annyang !== 'undefined') {
            var voices;
            var utter = new SpeechSynthesisUtterance();
            utter.rate = 1;
            utter.pitch = 0.5;
            utter.lang = 'es-PER';
            window.speechSynthesis.onvoiceschanged = function () {
                voices = window.speechSynthesis.getVoices();
                console.log(voices);
            };
        
        var jokeArray = [
            "¿Qué le dice un jardinero a otro? Nos vemos en el huerto.",
            "¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.",
            "¿Cuál es el animal más antiguo? La cebra, porque está en blanco y negro.",
            "¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.",
            "¿Cuál es el postre favorito de los árboles? El arbolate.",
        ];
    
      //Definimos los comandos a utilizar.
        var commands = {
            'saluda': function(){
                utter.text='a quien desea que salude señor?';
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
                annyang.addCallback('result', function (phrases) {
                    console.log("Nombre: ", phrases[0]);
                    annyang.removeCallback('result');
                    utter.text = 'Hola ' + phrases[0]+ ', espero que estes muy bien de salud, cuidate mucho!';
                    window.speechSynthesis.speak(utter);
                });
            },
            'musica': function() {
                utter.text='¡Preparándome para escuchar música en youtube!';
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
                window.open('https://www.youtube.com/watch?v=WWUoq4RtHV0&t=3898s&start=0', '_blank');
                utter.text='espero que le guste esta canción señor';
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
            },
            'spotify': function() {
                utter.text='¡Preparándome para escuchar música en spotify!';
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
                window.location.href = 'spotify:track:https://open.spotify.com/track/1Rl25VpYAmwet3uJrBBVbF?si=110abcb25a204161';
                utter.text='espero que le guste esta canción señor';
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
            },
            'informacion': function(concepto) {
            utter.text = '¿Qué tema te interesa investigar?';
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            annyang.addCallback('result', function (phrases) {
                console.log("informacion: ", phrases[0]);
                annyang.removeCallback('result');
                utter.text = 'buscando, ' + phrases[0];
                window.speechSynthesis.speak(utter);
                window.open('https://www.google.com/search?q=' + encodeURIComponent(phrases[0]), '_blank');
                utter.text='esta informacion encontré, de '+phrases[0];
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
            });
            },
            'hora': function(concepto){
                const horaActual = new Date().toLocaleTimeString();
                const fechaActual = new Date().toLocaleDateString();
                utter.text = 'son las '+ horaActual + ' del ' + fechaActual;
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
            },
            'ubicacion': function(concepto){
                navigator.geolocation.getCurrentPosition(function (position) {
                    const latitud = position.coords.latitude;
                    const longitud = position.coords.longitude;
                    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        const ubicacionActual = data.display_name;
                        utter.text = 'Estamos en' +ubicacionActual;
                        utter.voice = voices[6];
                        window.speechSynthesis.speak(utter);
                    })
                    .catch(error => {
                        utter.text = 'No pude obtener tu ubicación.';
                        utter.voice = voices[6];
                        window.speechSynthesis.speak(utter);
                    });
                });    
            },              
            'como te llamas': function () {
            utter.text = 'soy Jarvis, tu asistente virtual';
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            },
            'estas': function () {
                utter.text = 'Para usted señor siempre, ¿que aremos hoy?';
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
            },
            'trabajos': function() {
                    utter.text='¡Preparándome para ver si tenemos trabajos pendientes señor!';
                    utter.voice = voices[6];
                    window.speechSynthesis.speak(utter);
                    window.open('https://canvas.utp.edu.pe/', '_blank');
                    utter.text='¡Ingresé a canvas UTP!';
                    utter.voice = voices[6];
                    window.speechSynthesis.speak(utter);
            },
            'curso': function() {
                utter.text='¡ingresando al programa one oracle next education!';
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
                window.open('https://app.aluracursos.com/dashboard', '_blank');
                utter.text='¡ingresé a Alura latam, suerte en su curso señor!';
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
            },
            'jarvis': function () {
            utter.text = 'dígame señor?';
            //Setea la voz que queremos usar en base a nuestra lista.
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            },
            'buenos dias': function () {
                utter.text = 'buenos dias señor, espero que haya descansado bien!, que tenga un buen dia! ';
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
                },
            'hola jarvis': function () {
            utter.text = 'como esta señor, que haremos hoy??';
            //Setea la voz que queremos usar en base a nuestra lista.
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            },
            'como estas': function () {
            utter.text = 'Muy bien señor! y usted?';
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            },
            'perfecto': function () {
            utter.text = 'eso me alegra señor';
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            },
            'hola': function () {
            utter.text = 'hola, cual es tu nombre?';
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            //Guarda el nombre que le decimos por voz.
            annyang.addCallback('result', function (phrases) {
                //Imprime el nombre por consola.
                console.log("Nombre: ", phrases[0]);
                //Para el evento result.
                annyang.removeCallback('result');
                //Nos dice hola + el nombre que le digamos por voz.
                utter.text = 'Hola, ' + phrases[0];
                window.speechSynthesis.speak(utter);
            });
            },
            'planes': function(){
            utter.text='solo atenderte, en lo que nesecites';
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            },
            'broma': function() {
            var randomIndex = Math.floor(Math.random() * jokeArray.length);
            utter.text = jokeArray[randomIndex];
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            },
            'mensaje': function () {
                utter.text = 'señor queria decirle que! estoy muy feliz que me haya creado, estoy mas que contento de estar en esta vida. trabajaré para mejorar dia a dia. no te desveles mucho señor, ya pronto amanecera!';
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
            },
        }
        annyang.addCommands(commands);
        annyang.start({ autoRestart: false, continuous: true });
        annyang.removeCallback('result');
    } else{
        console.log("Annyang no es compatible con este equipo")
    }
}