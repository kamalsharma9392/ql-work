import {aboutContent} from "../data/about.js";


export const getAbout = async(req, res) => {
    try {
        res.status(200).json(aboutContent);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}