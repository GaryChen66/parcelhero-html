$(function () {
    setProgress();
    initProgressCircles();
});


function initProgressCircles() {
    $('.progress-circle').each(function () {

        //  This
        var $this = $(this);

        //  Init
        $this.circleChart({
            animate: true,
            size: ($this.data('diameter') ? $this.data('diameter') : 100),
            value: $this.data('percent'),
            text: $this.data('percent') + "%",
            guage: 8,
            color: '#248dd5',
            textSize: '15px',
            lineCap: "square",
        });
    });
}

function setProgress() {
    var progress = document.querySelector("[data-progress]");
    progress.style.transform = "scaleX(" + progress.dataset.progress + ")";
}

