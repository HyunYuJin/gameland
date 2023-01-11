# gameland

## Configuring Apps
```
$ pnpm create vite admin --template react-ts
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