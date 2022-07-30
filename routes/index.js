const fs = require('fs');
const obj2gltf = require('obj2gltf');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('get request to /');
    res.send(`api.broersdesign.com`)
});

router.post('/post', (req, res) => {

    console.log("post request to /post");
    console.log(req.query.format);
    if (typeof req.body.model == 'string') {

        const isModelObjExists = fs.existsSync(`${__dirname}/model/model.obj`);


        if (isModelObjExists) {
            fs.unlinkSync(`${__dirname}/model/model.obj`);
        }


        let modelString = req.body.model;

        modelString = modelString.replaceAll(
            'o',
            'o Broers_Design_Nederland'
        );

        modelString = modelString.replaceAll(
            'res_id:',
            'Broers_Design_Nederland_'
        );

        fs.appendFileSync(`${__dirname}/model/model.obj`, 'mtllib Broers_Design_Nederland_materials.mtl\n\n');
        fs.appendFileSync(`${__dirname}/model/model.obj`, modelString);

        // for glb format
        if(req.query.format === 'glb') {
            const isModelGlbExists = fs.existsSync(`${__dirname}/model/model.glb`);


        if (isModelGlbExists) {
            fs.unlinkSync(`${__dirname}/model/model.glb`);
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

        // for gltf format
        if(req.query.format === 'gltf') {
            const isModelGlbExists = fs.existsSync(`${__dirname}/model/model.gltf`);


        if (isModelGlbExists) {
            fs.unlinkSync(`${__dirname}/model/model.gltf`);
        }

        obj2gltf(`${__dirname}/model/model.obj`)
            .then((gltf) => {
                const data = Buffer.from(JSON.stringify(gltf));
                fs.appendFileSync(`${__dirname}/model/model.gltf`, data);
            })
            .then((result) => {
                res.sendFile(`${__dirname}/model/model.gltf`);
            });
        }

    }

});

module.exports = router;