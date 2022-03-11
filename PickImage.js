import *as React from "react"
import {Button, Image, View, Platform} from "react-native"
import *as ImagePicker from "expo- image-picker"
import *as Permissions from "expo-permissions"

export default class PickImage extends React.Components{
    state = {
        image:null
    }
    render(){
        let {image} = this.state
        
        return(
            <View style = {{flex:1, alignItems:"center", justifyContent: "center"}}>
                <Button
                title = "Pick an image from camera roll"
                      onPress={this._pickImage}/>
                
                </View>
        )
    }
    getPermissionAsync = async()=>{
        if(Platform.OS !== "web"){
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status !== "granted"){
                alert("sorry, we need permissions")

            }
        }
    }
    componentDidMount(){
        this.getPermissionAsync()
    }

    _pickImage = async()=>{
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaType : ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                asprct:[4, 3],
                quality:1,

            })
            if (!result.cancelled){
                this.setState({image:result.data})
                console.log(result.uri)
                this.uploadImage(result.uri)

            }
        }catch (E){
            console.log(E)
        }
    }
}