class UserInfo {
  constructor(userInfo, jobInfo, inputName, inputInfo, api){
    this.userInfo = userInfo;
    this.jobInfo = jobInfo; 
    this.inputName = inputName;
    this.inputInfo = inputInfo;
    this.api = api;
  }

  setUserInfo(){
    return this.api.profileEditing(this.inputName.value, this.inputInfo.value)
  }

  updateUserInfo(){
    this.api.getUserInformation()
      .then(res => {
        this.userInfo.textContent = res.name;
        this.jobInfo.textContent = res.about;
        this.inputName.value = res.name;
        this.inputInfo.value = res.about;
      })
      .catch(err => console.log(err))
  } 

}