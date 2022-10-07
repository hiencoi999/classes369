import "./App.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { I18n } from "aws-amplify";
import { translations } from "@aws-amplify/ui-react";
I18n.putVocabularies(translations);
I18n.setLanguage("vi");
I18n.putVocabularies({
  vi: {
    "Sign In": "Đăng nhập",
    "Sign in": "Đăng nhập",
    "Create Account": "Tạo tài khoản",
    Password: "Mật khẩu",
    "Confirm Password": "Nhập lại mật khẩu",
    Phone: "Số điện thoại",
    "Forgot your password?": "Quên mật khẩu?",
    "Reset your password": "Tạo lại mật khẩu",
    "New Password": "Mật khẩu mới",
    Code: "Mã",
    Submit: "Gửi",
    "Enter your email": "Nhập lại email của bạn",
    "Send code": "Gửi mã",
    "Resend Code": "Gửi lại mã",
    "Back to Sign In": "Quay lại trang đăng nhập",
  },
});

const formFields = {
  signUp: {
    phone_number: {
      dialCodeList: ["+84"],
    },
  },
};

export default function App() {
  return (
    <Authenticator formFields={formFields}>
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
