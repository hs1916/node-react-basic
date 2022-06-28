const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {
    Favorite.find({"movieId": req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err);
            // favorite 성공 숫자 보내주기
            res.status(200).json({success: true, favoriteNumber: info.length})
        })
})

router.post('/favorited', (req, res) => {

    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((err, info) => {
            if(err) return res.status(400).send(err);
            // favorite 성공 숫자 보내주기
            let result = false;
            if ( info.length !== 0 ) {
                result = true;
            }
            return res.status(200).json({ success: true, favorited: result})
        })
})

router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
            .exec((err, doc) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({
                    success: true,
                    doc: doc
                })
            })
})

router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            success: true
        })
    })
})

module.exports = router;