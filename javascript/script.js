(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

//download Curriculum vitae method
function downloadResume(){
    const resumePath = "/Resume/Tebogo maphatsoe cv (1).pdf";
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "TebogoMaphatsoe_Resume.pdf";
    document.body.appendChild(link);

    fetch(resumePath)
    .then(function(response){
      if (!response.ok) {
        throw new Error("File not found 🤷‍♀️!")
      }
      link.click();
      alert("File downloading...👍")

    })
    .catch(function(error){
       alert("Resume file not found 🤦!");
       console.error(error);
    })
    .finally(function(){
        document.body.removeChild(link);
    });

}