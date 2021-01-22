import React, {useEffect, useState, PureComponent} from 'react'
import {View, Text, StyleSheet, Image, Alert, TouchableOpacity} from 'react-native'
import {getLinkPreview} from 'link-preview-js';
import {Typography, Spacing, Colors, Styles, Strings} from '../../styles'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import {NamedIcon} from '../../components'
import Video from 'react-native-video';
import WaveForm from 'react-native-audiowaveform';
import SoundPlayer from 'react-native-sound-player'
import FastImage from 'react-native-fast-image'

const {LIGHT_GREY, DARK_GREY} = Colors
const {SIZE_5, SIZE_10, SIZE_1, SIZE_80, SIZE_20, SIZE_30, SIZE_200, SIZE_25, SIZE_150} = Spacing
const {FONT_REGULAR, FONT_BOLD} = Typography
const {LINK, TEXT, AUDIO, IMAGE, VIDEO, EDIT, DELETE} = Strings
const { 
    dimensions: {width}
} = Styles

let mMenuRef = ''



// const ChatCard = React.memo(props => {
//     const {data} = props
//     const {data: {coords, uri}, type} = data
//     const {containerStyle, innerContainerStyle, topContainerStyle, locationTextStyle, waveStyle} = styles


//     const [urlMetadata, updateUrlMetadata] = useState({})

    
    // useEffect(() => {
    //     type == LINK ? getLinkPreview(uri).then((preview) => {
    //         console.log({preview});
    //         updateUrlMetadata(preview)
    //     }) : false
    // }, []) 
    

//     return(
//         <View style={containerStyle} >
//             <View style={topContainerStyle} >
//                 <Image source={require('../../assets/images/location.png')} />
//             <Text style={locationTextStyle} >{coords}</Text>
//             </View>
//             <View style={[innerContainerStyle, (type == AUDIO || type == VIDEO || type == IMAGE) ? {paddingBottom: 30} : {}]} >
//                 {getCardData(data, urlMetadata)}
//             </View>
//             <View style={{position: 'absolute', bottom: type == LINK ? 18 : 12, right: 10}} >
//                 {renderMenuItem()}
//             </View>
//         </View>
//     )

// })

let isAudioPlaying = true

class ChatCard extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            urlMetadata: {},
            uuid: '',
        }
    }


    componentDidMount() {
        this.generateLinkPreview()
    }

    generateLinkPreview = () => {
        const {data: {type, data: {uri}}} = this.props
        type == LINK ? getLinkPreview(uri).then((preview) => {
            this.setState({urlMetadata: preview})
        }) : type == AUDIO ? SoundPlayer.loadUrl(uri) : false
    }

    onPlayPauseAudio = async (uri) => {
        console.log({uri, isAudioPlaying});
        try {
            if(isAudioPlaying) SoundPlayer.play()
            else SoundPlayer.pause()
            isAudioPlaying = !isAudioPlaying
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }

  
    getCardData(item, {title, url, images}) {
        const {type, data: {uri}} = item
        const {waveStyle, textDescriptionStyle, linkStyle, linkTitleStyle} = styles
        switch(type) {
            case AUDIO: return <TouchableOpacity onPress={() => this.onPlayPauseAudio(uri)} >
                                    <Image 
                                        resizeMode={'contain'}
                                        style={waveStyle}
                                        source={require('../../assets/images/audio_waves.png')} 
                                    />
                                </TouchableOpacity>
            // case AUDIO: return <WaveForm style={waveStyle} source={{uri}} waveFormStyle={{waveColor:'red', scrubColor:'white'}} play={true}  />
            case TEXT: return <Text style={textDescriptionStyle}>{uri}</Text>
            case LINK: return <View>
                                <FastImage 
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={[waveStyle, {height: SIZE_150}]}
                                    source={images ? {uri: images[0]} : require('../../assets/images/demo_img.jpg')} 
                                />
                                <Text style={linkTitleStyle} >{title}</Text>
                                <Text style={linkStyle} >{url}</Text>
                            </View>
            case IMAGE: return <View>
                                <FastImage 
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={[waveStyle, {height: SIZE_150}]}
                                    source={{uri}} 
                                />
                            </View>
            case VIDEO: return <View>
                                    <Video
                                        poster={'https://icon-library.com/images/buffering-icon/buffering-icon-24.jpg'}
                                        source={{uri}}
                                        style={[waveStyle, {height: SIZE_150}]}
                                        resizeMode={'cover'}
                                        controls
                                        autoPlay={false}
                                    />
                                </View>
        }
    }


    onDeletePress = (id) => {
        const {onDelete} = this.props
        Alert.alert(
            'Delete',
            'Are you sure you want to delete?',
            [
              {
                text: 'Yes',
                onPress: () => onDelete(id)
              },
              {
                text: 'No',
                onPress: () => {},
                style: 'cancel'
              },
            ],
            { cancelable: false }
          );
    }

    renderMenuItem(index) {
        const {data, onEdit} = this.props
        const {id, type, data: {uri}} = data
        return(
            <Menu ref={(ref) => this.mMenuRef = ref} >
                <MenuTrigger children={<Image source={require('../../assets/images/options.png')} />} />
                <MenuOptions>
                    {
                        type == LINK || type == TEXT
                        ? (
                            <MenuOption value={1}>
                                <NamedIcon
                                    onPress={() => {onEdit(id, uri); this.mMenuRef.close()}}
                                    label={EDIT}
                                    iconProps={{name: 'edit-2', type: 'feather'}}
                                />
                            </MenuOption>
                        ) : false
                    }
                    
                    <MenuOption value={2}>
                        <NamedIcon
                            onPress={() => {this.onDeletePress(id); this.mMenuRef.close()}}
                            label={DELETE}
                            iconProps={{name: 'delete', type: 'antdesign'}}
                        />
                    </MenuOption>
                </MenuOptions>
            </Menu>
        )
    }

    render() {
        const {data, move, moveEnd} = this.props
        const {data: {coords, uri}, type} = data
        const {containerStyle, innerContainerStyle, topContainerStyle, locationTextStyle, waveStyle} = styles
        const {urlMetadata} = this.state
    
        console.log("called");
        return(
            <TouchableOpacity 
                onLongPress={move}
                onPressOut={moveEnd}
            >
                <View style={containerStyle} >
                    <View style={topContainerStyle} >
                        <Image source={require('../../assets/images/location.png')} />
                    <Text style={locationTextStyle} >{coords}</Text>
                    </View>
                    <View style={[innerContainerStyle, (type == AUDIO || type == VIDEO || type == IMAGE) ? {paddingBottom: 30} : {}]} >
                        {this.getCardData(data, urlMetadata)}
                    </View>
                    <View style={{position: 'absolute', bottom: type == LINK ? 18 : 12, right: 10}} >
                        {this.renderMenuItem()}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    containerStyle: {
        padding: SIZE_10
    },
    topContainerStyle: {
        borderTopLeftRadius: SIZE_5,
        borderTopRightRadius: SIZE_5,
        backgroundColor: LIGHT_GREY,
        width: SIZE_200,
        flexDirection: 'row',
        padding: SIZE_5,
        paddingStart: SIZE_10
    },
    innerContainerStyle: {
        borderRadius: SIZE_10,
        backgroundColor: LIGHT_GREY,
        borderTopLeftRadius: 0,
        marginTop: SIZE_1
    },
    locationTextStyle: {
        ...FONT_REGULAR,
        marginStart: SIZE_10,
    },
    waveStyle: {
        backgroundColor: DARK_GREY, 
        width: width - SIZE_30, 
        borderTopRightRadius: SIZE_10,
        padding: SIZE_10,
        height: SIZE_80
    },
    textDescriptionStyle: {
        ...FONT_REGULAR,
        padding: SIZE_10,
        lineHeight: SIZE_20,
    },
    linkTitleStyle: {
        ...FONT_BOLD,
        paddingStart: SIZE_10,
        paddingTop: SIZE_5
    },
    linkStyle: {
        ...FONT_REGULAR,
        paddingStart: SIZE_10,
        paddingBottom: SIZE_5
    }
})

export {ChatCard}