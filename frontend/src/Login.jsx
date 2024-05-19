import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const idClear = () => {
    setId("");
  };
  const pwClear = () => {
    setPw("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const apiUrl = "https://swe.mldljyh.tech/api/users/login";

    const requestData = {
      username: id,
      password: pw,
    };

    console.log("Request Data:", requestData);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        console.log("Response Status:", response.status);
        if (response.status === 200) {
          alert("로그인 성공");
          navigate("/home");
          return response.json();
        } else if (response.status === 401) {
          throw new Error("로그인에 실패했습니다.");
        } else if (response.status == 400) {
          throw new Error("잘못된 요청입니다.");
        } else {
          throw new Error("로그인 요청에 실패했습니다.");
        }
      })
      .then((data) => {
        console.log("Response Data:", data);
        const user = data.user;
        console.log(user);
        // history.push("/home");
      })
      .catch((error) => {
        setErrorMsg(error.message);
        console.error(error);
      });
  };

  return (
    <main>
      <div id="warp" className="warp">
        <header className="header" role="banner">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className="header_inner">
            <a
              className="logo"
              href="https://reactjs.org"
              rel="noopener noreferrer"
            >
              <h1>Issue Management</h1>
            </a>
          </div>
        </header>
      </div>
      <div id="container" className="container">
        <div className="content">
          <div className="login_wrap">
            <ul className="panel_wrap">
              <li className="panel_item" /*style="display:block;"*/>
                <div
                  className="panel_inner"
                  role="tabpanel"
                  aria-controls="loinid"
                >
                  <div className="id_pw_wrap">
                    <div className="input_row" id="id_line">
                      <input
                        type="text"
                        id="id"
                        name="id"
                        placeholder="아이디"
                        title="아이디"
                        className="input_text"
                        maxLength={41}
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                      />
                      {id && (
                        <span
                          role="button"
                          className="btn_delete"
                          id="id_clear"
                          onClick={idClear}
                        >
                          <span className="icon_delete">
                            <span className="blind">삭제</span>
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="input_row" id="pw_line">
                      <input
                        type="password"
                        id="pw"
                        name="pw"
                        placeholder="비밀번호"
                        title="비밀번호"
                        className="input_text"
                        maxLength={16}
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                      />
                      {pw && (
                        <span
                          role="button"
                          className="btn_delete"
                          id="pw_clear"
                          onClick={pwClear}
                        >
                          <span className="icon_delete">
                            <span className="blind">삭제</span>
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="login_error_wrap">
                    {errorMsg && (
                      <div className="errorMessage">
                        <strong>아이디</strong> 또는 <strong>비밀번호</strong>가
                        일치하지 않습니다.
                      </div>
                    )}
                  </div>

                  <div className="btn_login_wrap">
                    <button
                      type="submit"
                      className="btn_login"
                      id="log.login"
                      onClick={handleLogin}
                    >
                      <span className="btn_text">로그인</span>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="signup_wrap">
            <a href="home" className="signup_text">
              {" "}
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
