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
import { API, Hub, I18n } from 'aws-amplify';
import React from 'react';
import { Navigate } from 'react-router-dom';
import '../../App.css';
import { createUser } from '../../graphql/mutations';
// @ts-ignore
import logo from '../homepage/assets/logo.png';
// @ts-ignore
import videoBackground from './assets/background.mp4';
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
    Submitting: 'Đang gửi',
    'We Sent A Code': 'Chúng tôi đã gửi mã',
    'Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.':
      'Vui lòng kiểm tra hòm thư để lấy mã xác thực'
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
  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.small}>
        <Text color={tokens.colors.neutral[80]}>&copy; Made by Nguyen Sinh Hien</Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading padding={`${tokens.space.small} 0 0 0`}>
          <View textAlign="center">
            <Image alt="Classes369 logo" src={logo} style={{ height: '200px' }} />
          </View>
        </Heading>
      );
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

      return (
        <Heading padding={`${tokens.space.small} 0 0 0`}>
          <View textAlign="center">
            <Image alt="Classes369 logo" src={logo} style={{ height: '85px' }} />
          </View>
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

  const createNewUser = async (userId) => {
    console.log(userId);
    const data = await API.graphql({
      query: createUser,
      variables: { input: { id: userId } }
    });
    console.log('tao thanh cong');
    console.log({ data });
  };

  Hub.listen('auth', (data) => {
    switch (data.payload.event) {
      case 'signIn':
        console.log('user signed in');

        break;
      case 'signUp':
        console.log('dang sign up ne');
        createNewUser(data.payload.data.userSub);
        localStorage.setItem('isFirstTimeLoggedIn', 'true');
        break;
      case 'signOut':
        console.log('user signed out');
        break;
      case 'signIn_failure':
        console.log('user sign in failed');
        break;
      case 'configured':
        console.log('the Auth module is configured');
    }
  });

  return authStatus === 'authenticated' ? (
    <Navigate to="/home" />
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
