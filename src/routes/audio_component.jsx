import React, { Component } from "react";

import MicRecorder from "mic-recorder-to-mp3";
import { AudioOutlined, BorderOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Tooltip, Space } from "antd";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default class Audio extends Component {
  constructor(props) {
    super(props);

    /*    

     * declare states that will enable and disable  

     * buttons that controls the audio widget

     */

    this.state = {
      isRecording: false,

      blobURL: "",

      isBlocked: false,

      isRecordingStp: false,
    };

    //binds the methods to the component

    this.start = this.start.bind(this);

    this.stop = this.stop.bind(this);

    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    //Prompt the user for permission to allow audio device in browser

    // navigator.getUserMedia =
    //   navigator.mediaDevices.getUserMedia() ||
    //   navigator.webkitGetUserMedia ||
    //   navigator.mozGetUserMedia ||
    //   navigator.msGetUserMedia;

    //Detects the action on user click to allow or deny permission of audio device
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia(
        { audio: true },
        () => {
          console.log("Permission Granted");
          this.setState({ isBlocked: false });
        },
        () => {
          console.log("Permission Denied");
          this.setState({ isBlocked: true });
        }
      );
    } else {
      console.log("mediaDevices not support on the browser");
      this.setState({ isBlocked: true });
    }
  }

  start() {
    /*  

     * If the user denys permission to use the audio device

     * in the browser no recording can be done and an alert is shown

     * If the user allows permission the recoding will begin

     */

    if (this.state.isBlocked) {
      alert("Permission Denied");
    } else {
      Mp3Recorder.start()

        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  }

  stop() {
    /*

     * Once the recoding starts the stop button is activated

     * Click stop once recording as finished  

     * An MP3 is generated for the user to download the audio

     */

    Mp3Recorder.stop()

      .getMp3()

      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);

        this.setState({ blobURL, isRecording: false });

        this.setState({ isRecordingStp: true });
      })
      .catch((e) => console.log(e));
  }

  reset() {
    /*    

       * The user can reset the audio recording  

       * once the stop button is clicked    

       */

    document.getElementsByTagName("audio")[0].src = "";

    this.setState({ isRecordingStp: false });
  }

  render() {
    //display view of audio widget and control buttons

    return (
      <div>
        <div id='record-group'>
          <Button
            type='primary'
            shape='circle'
            icon={<AudioOutlined />}
            onClick={this.start}
            disabled={this.state.isRecording}
          />
          <Button
            type='primary'
            shape='circle'
            icon={<BorderOutlined />}
            onClick={this.stop}
            disabled={!this.state.isRecording}
          />
          <Button
            type='primary'
            shape='circle'
            icon={<UndoOutlined />}
            onClick={this.reset}
            disabled={!this.state.isRecordingStp}
          />
        </div>
        <div>
          <audio src={this.state.blobURL} controls='controls' />
        </div>
      </div>
    );
  }
}
