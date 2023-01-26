# gameland

## Configuring Apps
```
$ pnpm create vite 프로젝트명 --template react-ts
```

## Settings package.json
공유 프로젝트에 대한 참조를 추가하고 프로젝트 이름을 업데이트해야 합니다.
```javascript
// package.json
{
	"name": "@gameland/프로젝트명",
	// ...
	"dependencies": {
		"@gameland/shared": "workspace:*",
		// ...
  }
}
```

## 설치
pnpm-workspace.yaml 파일에 등록된 모든 App들은 추적되고 있으므로 다음 명령어로 모든 App의 패키지를 한방에 설치할 수 있다.
```
$ pnpm install
```

---

## 게임 소개

### MBIT
진입 페이지            |  질문지
:-------------------------:|:-------------------------:
![127 0 0 1_5173_](https://user-images.githubusercontent.com/38209966/214874440-b8389047-56ef-45d8-9574-ccc7238b6e23.png) | ![127 0 0 1_5173_ (1)](https://user-images.githubusercontent.com/38209966/214874419-284c93cc-e23e-483b-8da6-c42327766bcc.png)

당신의 개발자 유형은 뭘까요?
- 백엔드 개발
- 프론트엔드 개발
- 데이터분석과 인공지능
- 정보보안
- 게임 개발
