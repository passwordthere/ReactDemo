/*
 * @Date: 2022-01-10 16:31:02
 * @LastEditTime: 2022-01-11 18:54:29
 * @Description: 
 * @FilePath: \yangzhengyi-frontend\src\Links.js
 */

const env = "pro"

let Links = ()=>{
  if(env === "dev"){
    return {
      base: "http://192.168.59.83:8000/api/",
      media: "http://192.168.59.83:8000/media/"
    }
  }else{
    return {
      base: "http://localhost:8000/api/",
      media: "http://localhost:8000/media/"
    }
  }
};




export default Links;
