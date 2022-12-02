import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls';

//캔버스 설정
var myCanvas = document.querySelector('#canvas1')

//렌더 선언
const renderer = new THREE.WebGLRenderer({
    canvas: myCanvas,
    antialias: true
})

//렌더 사이즈 설정
var widthHeightRatio = myCanvas.getBoundingClientRect()
renderer.setSize(widthHeightRatio.width, widthHeightRatio.height)
renderer.setPixelRatio(devicePixelRatio)

//카메라 선언 및 설정
const camera = new THREE.PerspectiveCamera(
  //시야 각도
  75,

  //화면 비율
  widthHeightRatio.width / widthHeightRatio.height,

  //볼 수 있는 가장 가까운 범위
  0.1,

  //볼 수 있는 가장 먼 범위
  1000
)

//카메라 위치 조정
camera.position.set(0, 0, 20);

//무대 선언
const scene = new THREE.Scene();

//마우스를 사용한 카메라의 이동, 줌 설정
const controls = new OrbitControls(camera, renderer.domElement)


let modelMeshArr = []
let lineMeshArr = []

let vertices = new Float32Array( [
  1, 3, 3,
  1, -3, 3,
  7, 3, 3,
  7, -3, 3,
  1, 3, -3,
  1, -3, -3,
  7, 3, -3,
  7, -3, -3,
] );

let geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
geometry.setIndex([
  0, 1, 2, 1, 3, 2,
  4, 6, 5, 5, 6, 7,
  0, 4, 5, 1, 0, 5,
  0, 6, 4, 0, 2, 6,
  2, 7, 6, 7, 2, 3,
  3, 1, 5, 5, 7, 3
])

modelMeshArr.push(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xEA68A2})))

geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
geometry.setIndex([
  0, 4, 5, 1, 0, 2, 6, 4, 6, 7, 5, 6, 7, 3, 1, 2, 3
])

lineMeshArr.push(new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xFFFF00})))

modelMeshArr.push(new THREE.Mesh(new THREE.BoxGeometry(6, 3, 6), new THREE.MeshBasicMaterial({color: 0x0068B7})))
modelMeshArr.push(new THREE.Mesh(new THREE.BoxGeometry(6, 3, 6), new THREE.MeshBasicMaterial({color: 0x0068B7})))
modelMeshArr.push(new THREE.Mesh(new THREE.BoxGeometry(2, 6, 6), new THREE.MeshBasicMaterial({color: 0x666666})))

modelMeshArr[1].position.x = -4
modelMeshArr[1].position.y = 1.5
modelMeshArr[2].position.x = -4
modelMeshArr[2].position.y = -1.5

for(let i = 1; i < 4; i++)  {
  lineMeshArr.push(new THREE.LineSegments(new THREE.EdgesGeometry(modelMeshArr[i].geometry), new THREE.LineBasicMaterial({color: 0xFFFF00})))
}

lineMeshArr[1].position.x = -4
lineMeshArr[1].position.y = 1.5
lineMeshArr[2].position.x = -4
lineMeshArr[2].position.y = -1.5

for(let i = 0; i < 4; i++)  {
  modelMeshArr[i].material.transparent = true
  modelMeshArr[i].material.opacity = 0.5
  scene.add(modelMeshArr[i])
  scene.add(lineMeshArr[i])
}

scene.add(lineMeshArr[0])

let mapVertices = [
  [-7, 3, 3],
  [-1, 3, 3],
  [-7, 0, 3],
  [-1, 0, 3],
  [-7, -3, 3],
  [-1, -3, 3],
  [1, 3, 3],
  [1, -3, 3],
  [7, 3, 3],
  [7, -3, 3],
  [-7, 3, -3],
  [-1, 3, -3],
  [-7, 0, -3],
  [-1, 0, -3],
  [-7, -3, -3],
  [-1, -3, -3],
  [1, 3, -3],
  [1, -3, -3],
  [7, 3, -3],
  [7, -3, -3]
]

let mapConnections = [
  [1, 2, 10],
  [0, 3, 6, 11],
  [0, 3, 4, 12],
  [1, 2, 5, 13],
  [2, 5, 14],
  [3, 4, 7, 15],
  [1, 7, 8, 16],
  [5, 6, 8, 9, 17],
  [6, 7, 9, 18],
  [7, 8, 19],
  [0, 11, 12],
  [1, 10, 13, 16],
  [2, 10, 13, 14],
  [3, 11, 12, 15],
  [4, 12, 15],
  [5, 13, 14, 17],
  [6, 11, 17, 18],
  [7, 15, 16, 18, 19],
  [8, 16, 17, 19],
  [9, 17, 18]
]

let electNum = 3

let electPos = []
let electDest = []
let electSpeed = []
let electPrev = []

let electronMesh = []

for(let i = 0; i < electNum; i++) {
  electPos.push(Math.floor(Math.random() * mapVertices.length))
  electDest.push(mapConnections[electPos[i]][Math.floor(Math.random() * mapConnections[electPos[i]].length)])
  electSpeed.push([mapVertices[electPos[i]][0] - mapVertices[electDest[i]][0], mapVertices[electPos[i]][1] - mapVertices[electDest[i]][1], mapVertices[electPos[i]][2] - mapVertices[electDest[i]][2]])
  electPrev.push(100)
  electronMesh.push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 16), new THREE.MeshBasicMaterial({color: 0xFFFF00})))
  electronMesh[i].position.x = mapVertices[electPos[i]][0]
  electronMesh[i].position.y = mapVertices[electPos[i]][1]
  electronMesh[i].position.z = mapVertices[electPos[i]][2]

  scene.add(electronMesh[i])
}



//애니메이션 함수
function animate()	{
  //애니메이션 반복 코드
	requestAnimationFrame(animate)

  //렌더 업데이트
	renderer.render(scene, camera)

  for(let i = 0; i < electNum; i++) {
    if(Math.round(electronMesh[i].position.x * 100) / 100 == mapVertices[electDest[i]][0] && Math.round(electronMesh[i].position.y * 100) / 100 == mapVertices[electDest[i]][1] && Math.round(electronMesh[i].position.z * 100) / 100 == mapVertices[electDest[i]][2])  {
      electPrev[i] = electPos[i]
      electPos[i] = electDest[i]
      do{
        electDest[i] = mapConnections[electPos[i]][Math.floor(Math.random() * mapConnections[electPos[i]].length)]
      } while (electDest[i] == electPrev[i])
      electSpeed[i] = [mapVertices[electPos[i]][0] - mapVertices[electDest[i]][0], mapVertices[electPos[i]][1] - mapVertices[electDest[i]][1], mapVertices[electPos[i]][2] - mapVertices[electDest[i]][2]]
      electronMesh[i].position.x = mapVertices[electPos[i]][0]
      electronMesh[i].position.y = mapVertices[electPos[i]][1]
      electronMesh[i].position.z = mapVertices[electPos[i]][2]
    } else {
      electronMesh[i].position.x -= electSpeed[i][0] / 100
      electronMesh[i].position.y -= electSpeed[i][1] / 100
      electronMesh[i].position.z -= electSpeed[i][2] / 100
    }
  }
}

//애니메이션 시작(필수)
animate()
