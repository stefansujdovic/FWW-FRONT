export { default as axios } from './axios';


export function showError(error) {
    return (<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>)
}


export function viewPassword(status, field) {
    let passStatus = document.getElementById(status);
    let passwordInput = document.getElementById(field);
  
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      passStatus.className = 'fa fa-eye-slash view_password_eye';
  
    }
    else {
      passwordInput.type = 'password';
      passStatus.className = 'fa fa-eye view_password_eye';
    }
  }