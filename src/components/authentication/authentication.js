import {
  Authenticator,
  Button,
  Heading,
  Image,
  Text,
  translations,
  useAuthenticator,
  useTheme,
  View
} from '@aws-amplify/ui-react';
import 'antd/dist/antd.min.css';
import { I18n } from 'aws-amplify';
import React from 'react';
import { Navigate } from 'react-router-dom';
import '../../App.css';
// @ts-ignore
import videoBackground from './assets/background.mp4';
// @ts-ignore
import logo from './assets/logo.png';
I18n.putVocabularies(translations);
I18n.setLanguage('vi');
I18n.putVocabularies({
  vi: {
    'Sign In': 'Đăng nhập',
    'Sign in': 'Đăng nhập',
    'Create Account': 'Tạo tài khoản',
    Password: 'Mật khẩu',
    'Confirm Password': 'Nhập lại mật khẩu',
    Phone: 'Số điện thoại',
    'Forgot your password?': 'Quên mật khẩu?',
    'Reset your password': 'Tạo lại mật khẩu',
    'New Password': 'Mật khẩu mới',
    Code: 'Mã',
    Submit: 'Gửi',
    'Enter your email': 'Nhập lại email của bạn',
    'Send code': 'Gửi mã',
    'Resend Code': 'Gửi lại mã',
    'Back to Sign In': 'Quay lại trang đăng nhập',
    'Incorrect username or password.': 'Email hoặc mật khẩu không đúng rồi!!!',
    'Signing in': 'Đang đăng nhập',
    'Creating Account': 'Đang tạo',
    Confirm: 'Xác nhận',
    'We Emailed You': 'Gửi Mã Thành Công',
    'Enter your code': 'Nhập mã',
    Submitting: 'Đang gửi'
  }
});

const formFields = {
  signUp: {
    phone_number: {
      dialCodeList: ['+84']
    }
  }
};

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image alt="Classes369 logo" src={logo} id="logo" />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>&copy; Made by Nguyen Sinh Hien</Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}></Heading>;
    },
    Footer() {
      const { toResetPassword } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button fontWeight="normal" onClick={toResetPassword} size="small" variation="link">
            Quên mật khẩu
          </Button>
        </View>
      );
    }
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}></Heading>;
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button fontWeight="normal" onClick={toSignIn} size="small" variation="link">
            Quay lại trang đăng nhập
          </Button>
        </View>
      );
    }
  },

  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xs} 0 0 0`} level={3}>
          Nhập thông tin:
        </Heading>
      );
    }
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xs} 0 0 0}`} level={3}>
          Nhập thông tin:
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button fontWeight="normal" onClick={toSignIn} size="small" variation="link">
            Quay lại trang đăng nhập
          </Button>
        </View>
      );
    }
  }
};

export default function AwsAuthenticator() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  console.log({ authStatus });
  return authStatus === 'authenticated' ? (
    <Navigate to="/" />
  ) : (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <Authenticator components={components} formFields={formFields} className="authenticator" />
    </>
  );
}
