const baseurl = process.env.NEXT_PUBLIC_API_URL!

export const authurls = {
    getotp: `${baseurl}/getotp`,
    signup: `${baseurl}/signup`,
    signin: `${baseurl}/signin`,
    verify2fa: `${baseurl}/verify2fa`,
};

export const userurls = {
    getinfo: `${baseurl}/getuserinfo`,
    removedevice: `${baseurl}/removedevice`,
    changepassword: `${baseurl}/changepassword`,
    resetpassword: `${baseurl}/resetpassword`,
};