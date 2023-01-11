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