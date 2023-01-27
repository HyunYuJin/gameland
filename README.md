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
시작 페이지|질문 페이지|결과 페이지
|:-------------------------:|:-------------------------:|:-------------------------:|
![127 0 0 1_5173_(Samsung Galaxy S20 Ultra) (1)](https://user-images.githubusercontent.com/38209966/215125521-16a8044b-71a1-4926-9783-0805753073b2.png) | ![127 0 0 1_5173_(Samsung Galaxy S20 Ultra) (2)](https://user-images.githubusercontent.com/38209966/215125530-e6605d44-56f5-4937-aa1c-18b21209a05a.png) | ![127 0 0 1_5173_(Samsung Galaxy S20 Ultra)](https://user-images.githubusercontent.com/38209966/215127489-7b1e76da-4993-4612-9a7d-bc3b60d45421.png)

당신의 개발자 유형은 뭘까요?
- 백엔드 개발
- 프론트엔드 개발
- 데이터분석과 인공지능
- 정보보안
- 게임 개발
