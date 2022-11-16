const fs = require('fs');
const obj2gltf = require('obj2gltf');

const express = require('express');

const router = express.Router();
const ftp = require("basic-ftp");
const { ThreeDCloudApi, postConvertByFormatRequest } = require("aspose3dcloud");

router.get('/', (req, res) => {
    console.log('get request to /');
    res.send(`convert.broersdesign.com`)
});

const uploadModel = async (format) => {
    const client = new ftp.Client(timeout = 30000)
    client.ftp.verbose = true
    try {
        await client.access({
            host: "68.183.11.66",
            user: "ftpuser",
            password: "password",
            secure: false
        })
        console.log(await client.list())
        await client.uploadFrom(`${__dirname}/model/model.obj`, "/files/model.obj");
        // await client.downloadTo("README_COPY.md", "README_FTP.md")
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

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
        if (req.query.format === 'glb') {
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
        if (req.query.format === 'gltf') {
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

        // for obj format
        if (req.query.format === 'obj') {
            res.sendFile(`${__dirname}/model/model.obj`);
        }

        // for ply format
        if (req.query.format === 'ply') {
            uploadModel()
        }


    }

});

module.exports = router;