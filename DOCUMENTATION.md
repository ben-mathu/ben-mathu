# Portfolio

## Known Errors
Brave browsers block a lot of cookies and this causes the player to only stream a preview.

> Make sure that the Embed code is complete
> The generated Embed code includes an `<iframe>` tag. If your application modifies the iFrame tag, or if you've made changes to the code manually, then this can cause the Embed to only stream a preview of the audio. In particular, make sure that you have not removed the allow="encrypted-media" attribute from the iFrame element — without this, the Embed will only allow users to listen to previews.

[Explained](https://developer.spotify.com/documentation/embeds/tutorials/troubleshooting)