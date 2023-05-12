if (annyang) {
    //Variable para almacenar las voces de nuestro sistema.
    var voices;
    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.lang = 'es-PER';
    window.speechSynthesis.onvoiceschanged = function () {
        voices = window.speechSynthesis.getVoices();
        console.log(voices);
    };

    //Definimos los comandos a utilizar.
    var commands = {
        'saluda': function(){
            utter.text='a quien desea que salude señor?';
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            //Guarda el nombre que le decimos por voz.
            annyang.addCallback('result', function (phrases) {
                //Imprime el nombre por consola.
                console.log("Nombre: ", phrases[0]);
                //Para el evento result.
                annyang.removeCallback('result');
                //Nos dice hola + el nombre que le digamos por voz.
                utter.text = 'Hola ' + phrases[0]+ ', espero que estes muy bien de salud, cuidate mucho!';
                window.speechSynthesis.speak(utter);
            });
        },
        'musica': function() {
            utter.text='Abriendo youtube';
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            window.open('https://www.youtube.com/watch?v=WWUoq4RtHV0&t=3898s&start=0', '_blank');
        },
        'spotify': function() {
            
            utter.text='Abriendo spotify';
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            window.location.href = 'spotify:track:https://open.spotify.com/track/1Rl25VpYAmwet3uJrBBVbF?si=110abcb25a204161';
        },
        'informacion': function(concepto) {
            utter.text = 'que informacion desea que busque?';
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
            //Guarda el nombre que le decimos por voz.
            annyang.addCallback('result', function (phrases) {
                //Imprime el nombre por consola.
                console.log("informacion: ", phrases[0]);
                //Para el evento result.
                annyang.removeCallback('result');
                //Nos dice hola + el nombre que le digamos por voz.
                utter.text = 'buscando, ' + phrases[0];
                window.speechSynthesis.speak(utter);
                window.open('https://www.google.com/search?q=' + encodeURIComponent(phrases[0]), '_blank');
                utter.text='esta informacion encontre de '+phrases[0];
                utter.voice = voices[6];
                window.speechSynthesis.speak(utter);
            });
        },
        'como te llamas': function () {
            utter.text = 'soy Jarvis, tu asistente virtual';
            utter.voice = voices[6];
            window.speechSynthesis.speak(utter);
        },
        'jarvis': function () {
            utter.text = 'dígame señor?';
            //Setea la voz que queremos usar en base a nuestra lista.
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
        }
    }
    //Sumamos todos los comandos a annyang.
    annyang.addCommands(commands);
    //Annyang comienza a escuchar.
    annyang.start({ autoRestart: false, continuous: true });
}