function hide_three_content(box){
    if(box.checked == true){
        document.getElementById("canvas1").style.display = "none"
        document.getElementById("wrap_three").style.display = "none"
        document.getElementById("hide_label").innerText = "show"
    }
    else {
        document.getElementById("canvas1").style.display = "block"
        document.getElementById("wrap_three").style.display = "block"
        document.getElementById("hide_label").innerText = "hide"
    }
}
