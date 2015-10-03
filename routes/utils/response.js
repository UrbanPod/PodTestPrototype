module.exports = {
    error: function (res, err) {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
            return true;
        } return false;
    },
    success: function (res, data) {
        response = {
            success: true
          , data: data
        };

        res.status(200).json(response);
    }
}
