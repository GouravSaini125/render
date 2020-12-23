import './App.css';
import {Power0, TimelineMax, gsap} from "gsap";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import { CSSPlugin } from 'gsap/CSSPlugin'
gsap.registerPlugin(CSSPlugin)

function App({match}) {

    // const [video, setVideo] = useState({
    //     "title": "Untitled Video",
    //     "url": null,
    //     "thumbnail": "https://storage.googleapis.com/web-dev-qv/user-videos/mailtogouravsaini@gmail.com/thumbnails/5fdac88f242ee964fa808bab.png",
    //     "id": "5fdac88f242ee964fa808bab",
    //     "slides": [
    //         {
    //             "textBoxes": [
    //                 {
    //                     "id": "HsQqcqdb",
    //                     "text": "How Much Money Food Bloggers Make To Develop A Recipe.",
    //                     "backgroundColor": "#6E6E6EAA",
    //                     "fill": "white",
    //                     "fontSize": 30
    //                 }
    //             ],
    //             "id": "5fdac88f242ee9af0b808bac",
    //             "bgImage": null,
    //             "bgVideo": "https://player.vimeo.com/external/231571956.hd.mp4?s=1bcf24d2c963be2a5be98cd1f19cefa9728832ba&profile_id=174",
    //             "bgProps": {},
    //             "duration": 4000
    //         },
    //         {
    //             "textBoxes": [
    //                 {
    //                     "id": "QzLpBHwE",
    //                     "text": "If you���ve ever noticed that a blog post is labeled ���sponsored, ��� it���s typically because the blogger partnered up with a brand (i. e. One of the ways they earn money is by developing recipes for brands.",
    //                     "backgroundColor": "#6E6E6EAA",
    //                     "fill": "white",
    //                     "fontSize": 30
    //                 }
    //             ],
    //             "id": "5fdac88f242ee9c194808bad",
    //             "bgImage": null,
    //             "bgVideo": "https://player.vimeo.com/external/257068818.hd.mp4?s=518f6d2fcbb47d0a6cb1e312a56166f6acca77cc&profile_id=169",
    //             "bgProps": {},
    //             "duration": 6000
    //         },
    //         {
    //             "textBoxes": [
    //                 {
    //                     "id": "0XYvNpx9",
    //                     "text": "She���s even tested some recipes eight times!The work that goes into developing recipes is worth it for Biddle, though.",
    //                     "backgroundColor": "#6E6E6EAA",
    //                     "fill": "white",
    //                     "fontSize": 30
    //                 }
    //             ],
    //             "id": "5fdac88f242ee9e196808bae",
    //             "bgImage": null,
    //             "bgVideo": "https://player.vimeo.com/external/396487973.hd.mp4?s=9a638732f81c0cf7641c7c44c9bc1a61b1bf8f74&profile_id=174",
    //             "bgProps": {},
    //             "duration": 6000
    //         },
    //         {
    //             "textBoxes": [
    //                 {
    //                     "id": "wTseLpRk",
    //                     "text": "As my traffic grew and my photography improved, I began charging brands for recipe development, ��� Anderson said.",
    //                     "backgroundColor": "#6E6E6EAA",
    //                     "fill": "white",
    //                     "fontSize": 30
    //                 }
    //             ],
    //             "id": "5fdac88f242ee933a3808baf",
    //             "bgImage": null,
    //             "bgVideo": "https://player.vimeo.com/external/378294357.hd.mp4?s=f1b339b860c6e63700ee8daa135174b15c08c9eb&profile_id=174",
    //             "bgProps": {},
    //             "duration": 6000
    //         },
    //         {
    //             "textBoxes": [
    //                 {
    //                     "id": "xvF4EAxf",
    //                     "text": "Now she develops sponsored recipes a couple times a month, typically earning at least $5, 000 per recipe, and works with brands like Sabra, Meijer (a supermarket chain) and Dole.",
    //                     "backgroundColor": "#6E6E6EAA",
    //                     "fill": "white",
    //                     "fontSize": 30
    //                 }
    //             ],
    //             "id": "5fdac88f242ee907b4808bb0",
    //             "bgImage": null,
    //             "bgVideo": "https://player.vimeo.com/external/396487978.hd.mp4?s=6a7f285b233b9fa0f248142b2f0ea898a22a1549&profile_id=174",
    //             "bgProps": {},
    //             "duration": 6000
    //         },
    //         {
    //             "textBoxes": [
    //                 {
    //                     "id": "QGjUpc9D",
    //                     "text": "The hobby blogger-turned-entrepreneur now runs her blog full-time and charges from $1, 250 to over five figures for recipe development.",
    //                     "backgroundColor": "#6E6E6EAA",
    //                     "fill": "white",
    //                     "fontSize": 30
    //                 }
    //             ],
    //             "id": "5fdac88f242ee9bd45808bb1",
    //             "bgImage": null,
    //             "bgVideo": "https://player.vimeo.com/external/396488004.hd.mp4?s=247786b12df6826d3979d7cd510bde554ee3aa39&profile_id=174",
    //             "bgProps": {},
    //             "duration": 6000
    //         }
    //     ],
    //     "aspectRatio": 1,
    //     "audio": null,
    //     "updated_at": "2020-12-17T02:55:13.373Z",
    //     "created_at": "2020-12-17T02:55:11.666Z"
    // });

    const [video, setVideo] = useState(null);

    // useEffect(() => {
    //     axios.get(`/api/videos/mailtogouravsaini@gmail.com/video/5fdac88f242ee964fa808bab`)
    //         .then(res => setVideo(res.data))
    //         .catch(err => console.error(err))
    // }, [])

    const handleLoad = async (video) => {

        const videos = document.querySelectorAll("video");
        for (let i = 0; i < videos.length; i++) {
            const v = videos[i]
            await new Promise(resolve => {
                const handleVidLoad = (e) => {
                    v.width = e.target.videoWidth;
                    v.height = e.target.videoHeight;
                    if (e.target.readyState === 4) {
                        v.removeEventListener("canplaythrough", handleVidLoad);
                        v.removeEventListener("error", handleVideoError);
                        resolve();
                    }
                }
                const handleVideoError = (e) => {
                    v.removeEventListener("canplaythrough", handleVidLoad);
                    v.removeEventListener("error", handleVideoError);
                    resolve();
                }

                if (v.readyState === 4) {
                    resolve();
                } else {
                    v.addEventListener("canplaythrough", handleVidLoad);
                    v.addEventListener("error", handleVideoError);
                }
            });
        }

        const scenes = document.querySelectorAll(".video .scene");
        const texts = document.querySelectorAll(".video .scene .stagger");

        let tl = new TimelineMax({paused: true});

        let currentVideo = scenes[0].querySelector("video");

        scenes.forEach((scene, i) => {
            let t = new TimelineMax();
            t
                .set(scene, {css: {zIndex: 1}})

            if (video.slides[i].bgVideo) {
                t
                    .fromTo(scene.querySelector("video"), {currentTime: 0}, {
                        ease: Power0.easeNone,
                        currentTime: 5,
                        duration: 5,
                    })
                    .call(() => currentVideo = scene.querySelector("video"), {}, 0)

                // t
                //     .call(() => scene.querySelector("video").play())
                //     .call(() => scene.querySelector("video").pause(), {}, 6)
            } else {
                t.to(scene.querySelector("img"), 5, {
                    ease: Power0.easeNone, scale: 1.16,
                })
            }

            t
                .fromTo(scene.querySelector(".text"), {x: -scene.querySelector(".text").clientWidth}, {
                    x: 0,
                    duration: 2,
                }, 0)

            // let text = texts[i];
            // text.innerHTML = text.innerHTML.replace(/./g, "<span>$&</span>").replace(/\s/g, "&nbsp;");
            // t
            //     .staggerFromTo(text.querySelectorAll("span"), 0.4, {
            //         autoAlpha: 0,
            //         rotationX: -90,
            //         top: "-30px",
            //     }, {
            //         autoAlpha: 1,
            //         rotationX: 0,
            //         top: "0px"
            //     }, 0.009, 0);

            tl.add(t)
        });


        window.progress = current => new Promise(async (resolve) => {
            tl.progress(current);
            await currentVideo.play()
            await currentVideo.pause()
            resolve()
        });

        // tl.play();

        // const fps = 30, duration = 5 * scenes.length;
        // let current = 0;
        //
        // async function start() {
        //     // const interval = setInterval(() => {
        //     tl.progress(current);
        //     current += 1 / fps / duration
        //     // currentVideo.currentTime += 1 / 30;
        //     await currentVideo.play()
        //     await currentVideo.pause()
        //     if (current > 1)
        //         return
        //     //     clearInterval(interval)
        //     console.log(current)
        //     start()
        //     // }, 100)
        // }
        //
        // start()

    }

    useEffect(() => {
        const {params: {email,id}} = match;
        axios.get(`/api/videos/${email}/video/${id}`)
            .then(res => {
                console.log(res.data)
                setVideo(res.data)
                handleLoad(res.data)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <div className="video">
            {
                video && (
                    video.slides.map((slide, i) => i < 20 ? (
                        <div className="scene" key={slide.id}>
                            {
                                slide.bgVideo ?
                                    <video src={`${slide.bgVideo}#t=0,10`} loop={true} crossOrigin="anonymous" muted/> :
                                    <img src={slide.bgImage} alt=""/>
                            }
                            <div className="cont">
                                <div className="text">{slide.textBoxes[0].text}</div>
                            </div>
                            {/*<div className="text stagger">{slide.textBoxes[0].text}</div>*/}
                        </div>
                    ) : "")
                )
            }
        </div>
    );
}

export default function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/:email/:id" component={withRouter(App)}/>
        </BrowserRouter>
    )
};
