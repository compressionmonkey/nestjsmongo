import * as jwt from 'jsonwebtoken';

export function CheckIfPropertiesAreValid(arr: Array<string>){
    const allProperties = ['id','profile_picture', 'fullname', 'phonenumber','city','summary','linkedin_url','github_url']
        let updatedProperties = []
        arr.forEach(value => {
            allProperties.forEach(props => {
                if(value == props){
                    updatedProperties.push(value)
                }
            })
        })
        return updatedProperties.length == arr.length
}
export function CheckToken(token: string){
    return jwt.verify(token, process.env.SECRET)
}