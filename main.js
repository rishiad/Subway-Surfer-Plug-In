// Define the miniplayer interface


chrome.tabs.query({
    currentWindow: true,
    active: true,
  }).then((tab) => { 
    console.log(tab)
    // Inject the miniplayer interface into the current page
    chrome.scripting.executeScript({
      target: {tabId: tab[0].id},
      function: () => {
        let miniplayer = document.createElement("div");
miniplayer.id = "miniplayer";
miniplayer.className = "miniplayer";
miniplayer.innerHTML = `
  <div id="player">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/ChBg4aowzX8?controls=0&autoplay=1&mute=1" allow="autoplay;" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
  </div>
  <style>
  .miniplayer {
    position: absolute;
    bottom: 10%;
    right: 0;
    background-color: white;
    z-index: 1000;
  }
</style>
`;
         document.getElementById("content-wrapper").appendChild(miniplayer);

      }
    });
  })

document.getElementsByTagName("button")[0].addEventListener("click", () => {
    chrome.tabs.query({
        currentWindow: true,
        active: true,
      }).then((tab) => { 
        console.log(tab)
        chrome.scripting.executeScript({
          target: {tabId: tab[0].id},
          function: () => {
             document.getElementById("miniplayer").parentNode.removeChild(document.getElementById("miniplayer"));
          }
        });
      })
})