const fs = require('fs');
const obj2gltf = require('obj2gltf');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('get request to /');
    res.send(`<h1>Response from api</h1>`)
});

router.post('/post', (req, res) => {

    console.log("post request to /post");
    if (typeof req.body.model == 'string') {

        const isModelObjExists = fs.existsSync(`${__dirname}/model/model.obj`);


        if (isModelObjExists) {
            fs.unlinkSync(`${__dirname}/model/model.obj`);
        }

        console.log('model was loded to the api');
        const modelString = req.body.model;


        const newModelString = modelString.replace(
            'o \nusemtl res_id:144410\n',
            'mtllib Broers_Design_Nederland_materials.mtl\n\no Broers_Design_Nederland\nusemtl Broers_Design_Nederland_144410\n'
        );
        fs.appendFileSync(`${__dirname}/model/model.txt`, newModelString);

        fs.appendFileSync(`${__dirname}/model/model.obj`, modelString);

        const isModelGlbExists = fs.existsSync(`${__dirname}/model/model.glb`);

        console.log(isModelGlbExists);

        if (isModelGlbExists) {
            fs.unlinkSync(`${__dirname}/model/model.glb`);
            console.log('delete model if it exist');
        }

        const options = {
            binary: true
        }

        obj2gltf(`${__dirname}/model/model.obj`, options)
            .then((glb) => {
                fs.appendFileSync(`${__dirname}/model/model.glb`, glb);
            })
            .then((result) => {
                res.sendFile(`${__dirname}/model/model.glb`);
            });

    }

});

module.exports = router;