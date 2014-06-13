module.exports = function(models){
  return {
    tagPost:  function(req, res){
        var newTag = new models.tag(req.body);
        newTag.save(function (err) {
          if (err) {
            return console.log(err);
          }
        });
        return res.send(newTag);
    },
    tagIdGet: function (req, res){
      return models.tag.findById(req.params.id, function (err, data) {
        if (!err) {
          return res.send(data);
        } else {
          return console.error(err);
        }
      });
    },
    tagGet: function(req, res){
      return models.tag.find("", function(err, data){
        if (!err){ 
          return res.send(data)
        }
        else{
           return console.error(err);
        }

      }); 
    },
    imagePost: function(req, res){
      var newTag = new models.image(req.body);
      newTag.save(function (err) {
        if (err) {
          return console.log(err);
        }
      });
      return res.send(newTag);
    },
    imageIdGet: function (req, res){
      return models.image.findById(req.params.id, function (err, data) {
        if (!err) {
          return res.send(data);
        } else {
          return console.error(err);
        }
      });
    },
    imageGet: function(req, res){
      return models.image.find("", function(err, data){
        if (!err){ 
          return res.send(data)
        }
        else{
           return console.error(err);
        }

      }); 
    },
    cardPost: function(req, res){
      var newTag = new models.card(req.body);
      newTag.save(function (err) {
        if (err) {
          return console.log(err);
        }
      });
      return res.send(newTag);
    },
    cardIdGet: function (req, res){
      return models.card.findById(req.params.id, function (err, data) {
        if (!err) {
          return res.send(data);
        } else {
          return console.error(err);
        }
      });
    },
    cardGet: function(req, res){
      return models.card.find("", function(err, data){
        if (!err){ 
          return res.send(data)
        }
        else{
           return console.error(err);
        }

      }); 
    },
    messagePost: function(req, res){
      var newTag = new models.message(req.body);
      newTag.save(function (err) {
        if (err) {
          return console.log(err);
        }
      });
      return res.send(newTag);
    },
    messageIdGet: function (req, res){
      return models.message.findById(req.params.id, function (err, data) {
        if (!err) {
          return res.send(data);
        } else {
          return console.error(err);
        }
      });
    },
    messageGet: function(req, res){
      return models.message.find("", function(err, data){
        if (!err){ 
          return res.send(data)
        }
        else{
           return console.error(err);
        }

      }); 
    }
  }
};