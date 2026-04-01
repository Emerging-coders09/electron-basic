document.getElementById('toggle-darm-mode').addEventListener('click',async ()=>{
    const isDarkmode = await window.darkMode.toggle()
    document.getElementById("theme-source").innerText = isDarkmode ? "Dark" : "Light"
})

document.getElementById('reset-to-system').addEventListener('click', async ()=>{
    await window.darkMode.system()
    document.getElementById('theme-source').innerText = "System"
})