"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "../../_components/BackButton";
import Logo from "../../_components/LogoLow";
import Button from "../../_components/Button";
import PasswordInput from "../../_components/PasswordInput";
import Input from "../../_components/Input";
import { useUserStore } from "@/store/userStore";
// import { useAuthGuard } from "@/lib/useAuthGuard";

export default function SignupPasswordForm() {
  // useAuthGuard(false);
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNext = () => {
    const password = user.password ?? "";

    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      alert("비밀번호는 영문 + 숫자 조합으로 8자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    router.push("/signup/complete");
  };

  const handlePasswordChange = (value: string) => {
    setUser({ ...user, password: value });
  };

  return (
    <main className="bg-white min-h-screen flex justify-center items-center">
      <div className="min-w-[320px] w-full max-w-[480px] px-6 flex flex-col items-center gap-8">
        <div className="w-full">
          <BackButton />
        </div>

        <Logo />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          {/* 비밀번호 */}
          <div className="relative">
            <PasswordInput
              value={user.password ?? ""}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="PW"
            />
          </div>

          {/* 비밀번호 확인 */}
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* 완료 버튼 */}
          <Button buttonType="submit">비밀번호 입력</Button>
        </form>
      </div>
    </main>
  );
}
