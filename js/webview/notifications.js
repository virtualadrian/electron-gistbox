// listens for the gist:created Event, triggered by Gistbox
// atm: this is triggered twice, idk why
app.dispatcher.off("gist:created").on("gist:created", function(e) {
    //new Notification("Gist created", {
        //title: "Gist created",
        //body: "Your gist was successfully created"
    //});
});
