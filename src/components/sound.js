import React from 'react'
import { Link } from 'react-router'
import SoundStore from '../stores/sound-store'
import Wavesurfer from 'react-wavesurfer'

export default class Sound extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            playing: false,
            pos: 0
        }
        this.handleTogglePlay = this.handleTogglePlay.bind(this)
        this.handlePosChange = this.handlePosChange.bind(this)
    }

    handleTogglePlay() {
        this.setState({
            playing: !this.state.playing
        })
    }

    handlePosChange(e) {
        this.setState({
            pos: e.originalArgs[0]
        })
    }

    render() {

        let sound = SoundStore.getSound(this.props.params.soundId) || {}

        let options = {
            container: '#waveform',
            waveColor: '#888',
            progressColor: '#fb0',
            barWidth: 2
        }

        let playingText = this.state.playing ? 'Pause' : 'Play'

        return (
            <div>
                <h2>{sound.name}</h2>
                <Wavesurfer
                    audioFile={`/examples/${sound.key}.mp3`}
                    pos={this.state.pos}
                    onPosChange={this.handlePosChange}
                    playing={this.state.playing}
                />
                <a href="javascript:void(0);" onClick={this.handleTogglePlay}>{playingText}</a>
            </div>
        )
    }

}
