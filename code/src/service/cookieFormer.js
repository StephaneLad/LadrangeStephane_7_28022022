export default function() {
    let objCookie = Object.fromEntries(new URLSearchParams(document.cookie.replace(/; /g, "&")));
  
    let id = parseInt(objCookie.userId);
    let isAdmin = objCookie.is_admin === "true";
    return {
      user_id: id,
      token: objCookie.token, 
      is_admin: isAdmin
    }
  }