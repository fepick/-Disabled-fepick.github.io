import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls';
import * as dat from 'https://cdn.skypack.dev/dat.gui';

//FINFET 클래스
class FINFET  {
  //실행시 변수 설정
  constructor() {
    
    this.modelPos

    //MOSFET의 길이 비율
    this.widthLengthRatio = 10

    //MOSFET 모델을 도형으로 저장. 총 4개의 원소 저장
    this.modelMeshArr = []

    //MOSFET 모델을 선으로 저장. 총 4개의 원소 저장
    this.lineMeshArr = []
  }

  //모델을 나타내기 위한 초기 설정
  initModel(xPos, yPos, zPos, scene) {
    this.makeModelOne(xPos, yPos, zPos)
    this.makeModelTwo(xPos, yPos, zPos)
    this.makeModelThree(xPos, yPos, zPos)

    this.modelPos = [xPos, yPos, zPos]

    for(let i = 0; i < 4; i++)  {
      this.modelMeshArr[i].material.transparent = true
      this.modelMeshArr[i].material.opacity = 0.5
      scene.add(this.modelMeshArr[i])
      scene.add(this.lineMeshArr[i])
    }
  }

  //모델 초기 설정을 위한 함수(Source,Drain 구현)
  makeModelOne(xPos, yPos, zPos) {
    let tempMeshOne = new THREE.Mesh(new THREE.BoxGeometry(20, 5, 20), new THREE.MeshBasicMaterial( {color: 0x0068B7} ))
    let tempMeshTwo = new THREE.Mesh(new THREE.BoxGeometry(20, 5, 20), new THREE.MeshBasicMaterial( {color: 0x0068B7} ))

    tempMeshOne.position.x += xPos + 20
    tempMeshOne.position.y += yPos + 7.5
    tempMeshOne.position.z += zPos + 2.5

    tempMeshTwo.position.x += xPos + 50
    tempMeshTwo.position.y += yPos + 7.5
    tempMeshTwo.position.z += zPos + 2.5

    this.modelMeshArr.push(tempMeshOne)
    this.modelMeshArr.push(tempMeshTwo)

    let tempMeshThree = new THREE.LineSegments(new THREE.EdgesGeometry(tempMeshOne.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))
    let tempMeshFour = new THREE.LineSegments(new THREE.EdgesGeometry(tempMeshTwo.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))

    tempMeshThree.position.x += xPos + 20
    tempMeshThree.position.y += yPos + 7.5
    tempMeshThree.position.z += zPos + 2.5

    tempMeshFour.position.x += xPos + 50
    tempMeshFour.position.y += yPos + 7.5
    tempMeshFour.position.z += zPos + 2.5

    this.lineMeshArr.push(tempMeshThree)
    this.lineMeshArr.push(tempMeshFour)
  }
  
  //모델 초기 설정을 위한 함수(Body 구현)
  makeModelTwo(xPos, yPos, zPos) {
    let vertices = new Float32Array( [
      10, 0, 0,
      10, 5, 0,
      30, 5, 0,   
      30, 15, 0,
      40, 15, 0,
      40, 5, 0,   
      60, 5, 0,   
      60, 0, 0,
      40, 0, 0,
      30, 0, 0, 
      10, 0, 20,
      10, 5, 20,  
      30, 5, 20,  
      30, 15, 20,
      40, 15, 20,
      40, 5, 20,   
      60, 5, 20,   
      60, 0, 20,
      40, 0, 20, 
      30, 0, 20
    ] );

    let geometry = new THREE.BufferGeometry()

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setIndex([
      2,0,1,11,2,1,
      11,1,0,0,10,11,
      0,2,9,8,9,3,
      4,8,3,5,6,7,
      5,7,8,12,11,10,
      2,11,12,12,10,19,
      14,13,19,19,18,14,
      17,16,15,15,18,17,
      6,16,17,17,7,6,
      0,7,10,7,17,10,
      13,3,12,2,12,3,
      14,4,3,3,13,14,
      15,5,4,4,14,15,
      16,6,5,5,15,16
    ])

    let tempModelMesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { color: 0xEA68A2 } ))

    tempModelMesh.position.x += xPos
    tempModelMesh.position.y += yPos
    tempModelMesh.position.z -= 10

    this.modelMeshArr.push(tempModelMesh)

    geometry = new THREE.BufferGeometry()

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setIndex([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
      1, 11, 10, 17, 16, 6, 7, 17, 16, 15,
      14, 13, 12, 11, 10, 0,1,2,3,13,14,4
    ])

    let tempLineMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xFFFF00}))

    tempLineMesh.position.x += xPos
    tempLineMesh.position.y += yPos
    tempLineMesh.position.z -= 10

    this.lineMeshArr.push(tempLineMesh)
  }
  
  //모델 초기 설정을 위한 함수(Gate 구현)
  makeModelThree(xPos, yPos, zPos) {
    let vertices = new Float32Array( [
      10, 0, 0,//0
      10, 10, 0,
      30, 10, 0,
      40, 10, 0,
      60, 10, 0,   
      60, 0, 0,
      40, 0, 0,
      40, 5, 0,
      30, 5, 0,
      30, 0, 0,
      
      10, 0, 5,//10
      10, 10, 5,
      30, 10, 5,
      40, 10, 5,
      60, 10, 5,   
      60, 0, 5,
      40, 0, 5,
      40, 5, 5,
      30, 5, 5,
      30, 0, 5
    ] );

    let geometry = new THREE.BufferGeometry()

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setIndex([
      0,1,2,2,9,0,
      11,10,12,19,12,10,
      8,2,3,3,7,8,
      13,12,18,18,17,13,
      6,3,4,4,5,6,
      14,13,16,16,15,14,
      11,1,0,0,10,11,
      5,4,14,14,15,5,
      4,1,11,11,14,4,
      10,0,9,9,19,10,
      16,6,5,5,15,16,
      7,6,16,16,17,7,
      18,8,7,7,17,18,
      19,9,8,8,18,19,
    ])

    let tempModelMesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { color: 0x666666 } ))

    tempModelMesh.position.x += xPos
    tempModelMesh.position.y += yPos+10
    tempModelMesh.position.z = zPos

    this.modelMeshArr.push(tempModelMesh)

    geometry = new THREE.BufferGeometry()

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geometry.setIndex([
      0,1,2,3,4,5,6,7,8,9,0,
      10,11,12,13,14,15,16,17,18,19,10,
      11,1,4,14,15,5,6,16,17,7,8,18,19,9
    ])

    let tempLineMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xFFFF00}))

    tempLineMesh.position.x += xPos
    tempLineMesh.position.y += yPos+10
    tempLineMesh.position.z = zPos

    this.lineMeshArr.push(tempLineMesh)
  }
}

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
camera.position.set(0, 0, 35);

//무대 선언
const scene = new THREE.Scene();


//객체 정의
const newFIN = new FINFET()
//모델 초기 설정
newFIN.initModel(-35, -5, -2.5, scene)

//마우스를 사용한 카메라의 이동, 줌 설정
const controls = new OrbitControls(camera, renderer.domElement)

//애니메이션 함수
function animate()	{
  //애니메이션 반복 코드
	requestAnimationFrame(animate)

  //렌더 업데이트
	renderer.render(scene, camera)
}

//애니메이션 시작(필수)
animate()
