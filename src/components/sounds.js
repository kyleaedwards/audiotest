import React from 'react'
import { Link } from 'react-router'
import SoundStore from '../stores/sound-store'

export default class Sounds extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sounds: []
        }
    }

    componentDidMount() {
        // Get tracks here.
        this.setState({
            sounds: SoundStore.getAllSounds()
        })
    }

    render() {

        return (
            <div>
                <h3>Tracks</h3>
                <div className="master">
                    <ul>
                        {this.state.sounds.map(sound => (
                            <li key={sound.id}>
                                <Link to={`/sound/${sound.id}`}>{sound.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="detail">
                    {this.props.children}
                </div>
            </div>
        )
    }

}
