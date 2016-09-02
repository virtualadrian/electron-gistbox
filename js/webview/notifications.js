
    app.dispatcher.off("gist:created").on("gist:created", function(e) {
    new Notification("Gist created",  {
    title: "Gist created",
    body: "Your gist was successfully created"
  });
    }); 
