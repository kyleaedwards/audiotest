(function () {

    var Uploader = function (form) {

        var self = this;
        this.progressBar = document.getElementById('loading');
        this.fileUpload = form.getElementsByClassName('upload')[0];
        this.remaining = form.getElementsByClassName('uploader-remaining')[0];
        this.error = form.getElementsByClassName('uploader-error')[0];
        this.timer = false;

        this.remaining.style.display = 'none';
        this.error.style.display = 'none';

        this.fileUpload.addEventListener('change', function (e) {

            e.preventDefault();

            var bytesUploaded = 0,
                bytesTotal = 0,
                lastBytesLoaded = 0

            self.error.style.display = 'none';
            self.progressBar.style.transform = 'scaleX(0)';
            self.remaining.style.display = 'block';

            // get form data for POSTing
            var vFD = new FormData(form);

            // create XMLHttpRequest object, adding few event listeners, and POSTing our data
            var oXHR = new XMLHttpRequest();
            oXHR.upload.addEventListener('progress', function (e) {
                console.log(e);
                if (e.lengthComputable) {
                    bytesUploaded = e.loaded;
                    bytesTotal = e.total;
                    self.progressBar.style.transform = 'scaleX(' + (e.loaded / e.total) + ')';
                } else {
                    self.progressBar.style.transform = 'scaleX(0)'
                    clearInterval(self.timer)
                }
            }, false);
            oXHR.addEventListener('load', function (e) { // upload successfully finished
                self.progressBar.style.transform = 'scaleX(1)';
                self.remaining.innerHTML = '00:00:00 Remaining';
                clearInterval(self.timer);
                setTimeout(function () {
                    self.progressBar.style.transform = 'scaleX(0)';
                    self.progressBar.className = '';
                }, 500);
            }, false);
            oXHR.addEventListener('error', function (e) { // upload error
                self.progressBar.style.transform = 'scaleX(1)';
                self.progressBar.className = 'error';
                self.error.style.display = 'block';
                self.remaining.style.display = 'none';
                clearInterval(self.timer);
                setTimeout(function () {
                    self.progressBar.style.transform = 'scaleX(0)';
                    self.progressBar.className = '';
                }, 500);
            }, false);
            oXHR.open('POST', '/upload');
            oXHR.send(vFD);

            var timeSpent = 0;

            self.timer = setInterval(function () {
                timeSpent += 500;
                self.remaining.innerHTML = secondsToTime(((bytesTotal / bytesUploaded) * timeSpent - timeSpent) / 1000) + ' Remaining'; // 1/3
            }, 500);
        });
    }

    function secondsToTime(t) {
        var h = ~~(t / 3600);
        var m = ~~((t - (h * 3600))/60);
        var s = ~~(t - (h * 3600) -  (m * 60));
        h = ("0" + h).slice(-2);
        m = ("0" + m).slice(-2);
        s = ("0" + s).slice(-2);
        return h + ':' + m + ':' + s;
    }

    var uploaders = document.getElementsByClassName('uploader');
    for (var i = 0; i < uploaders.length; i++) {
        new Uploader(uploaders[i])
    }

    var trackPlayers = document.getElementsByClassName('track-player');
    Array.from(trackPlayers).forEach(function (trackPlayer) {
        var waveform = trackPlayer.getElementsByClassName('waveform')[0],
            wavesurfer = WaveSurfer.create({
                container: trackPlayer.getElementsByClassName('waveform')[0],
                waveColor: '#8cabdc',
                barWidth: '2',
                progressColor: '#5877a7'
            }),
            playing = false,
            controller = trackPlayer.getElementsByClassName('track-control')[0];
        wavesurfer.load(waveform.dataset.track);
        controller.addEventListener('click', function () {
            if (playing) {
                wavesurfer.pause();
                controller.innerText = 'Play';
            } else {
                wavesurfer.play();
                controller.innerText = 'Pause';
            }
            playing = !playing;
        });
    });

})();
