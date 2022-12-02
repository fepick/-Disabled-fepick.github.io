import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls';
import * as dat from 'https://cdn.skypack.dev/dat.gui';

//GAAFET 클래스
class GAAFET  {
  //실행시 변수 설정
  constructor() {
    
    this.modelPos

    //MOSFET의 길이 비율
    this.widthLengthRatio = 10

    //MOSFET 모델을 도형으로 저장. 총 7개의 원소 저장
    this.modelMeshArr = []

    //MOSFET 모델을 선으로 저장. 총 7개의 원소 저장
    this.lineMeshArr = []
  }

  //모델을 나타내기 위한 초기 설정
  initModel(xPos, yPos, zPos, scene) {
    this.makeModelOne(xPos, yPos, zPos)
    this.makeModelTwo(xPos, yPos, zPos)
    this.makeModelThree(xPos, yPos, zPos)
    this.makeModelFour(xPos, yPos, zPos)

    this.modelPos = [xPos, yPos, zPos]

    for(let i = 0; i < 7; i++)  {
      this.modelMeshArr[i].material.transparent = true
      this.modelMeshArr[i].material.opacity = 0.5
      scene.add(this.modelMeshArr[i])
      scene.add(this.lineMeshArr[i])
    }
  }

  //모델 초기 설정을 위한 함수(Drain, Source을 구현)
  makeModelOne(xPos, yPos, zPos) {
    let verticesOne = new Float32Array( [
      10, 5, 0,
      10, 10, 0,
      34.5, 10, 0,
      34, 5, 0,
      10, 5, 20,
      10, 10, 20,
      34.5, 10, 20,
      34, 5, 20
    ])
    let verticesTwo = new Float32Array( [
      36, 5, 0,
      35.5, 10, 0,
      60, 10, 0,
      60, 5, 0,
      36, 5, 20,
      35.5, 10, 20,
      60, 10, 20,
      60, 5, 20
    ])

    let geometryOne = new THREE.BufferGeometry()
    let geometryTwo = new THREE.BufferGeometry()

    geometryOne.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verticesOne), 3));
    geometryOne.setIndex([
      0,1,2,2,3,0,
      6,5,4,4,7,6,
      0,5,1,4,5,0,
      2,6,3,3,6,7,
      5,2,1,6,2,5,
      0,3,4,4,3,7
    ])
    geometryTwo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verticesTwo), 3));
    geometryTwo.setIndex([
      0,1,2,2,3,0,
      6,5,4,4,7,6,
      0,5,1,4,5,0,
      2,6,3,3,6,7,
      5,2,1,6,2,5,
      0,3,4,4,3,7
    ])

    let tempModelMeshOne = new THREE.Mesh(geometryOne, new THREE.MeshBasicMaterial( { color: 0x0068B7 } ))
    let tempModelMeshTwo = new THREE.Mesh(geometryTwo, new THREE.MeshBasicMaterial( { color: 0x0068B7 } ))

    tempModelMeshOne.position.x += xPos
    tempModelMeshOne.position.y += yPos
    tempModelMeshOne.position.z -= 10

    tempModelMeshTwo.position.x += xPos
    tempModelMeshTwo.position.y += yPos
    tempModelMeshTwo.position.z -= 10

    this.modelMeshArr.push(tempModelMeshOne)
    this.modelMeshArr.push(tempModelMeshTwo)

    geometryOne = new THREE.BufferGeometry()
    geometryTwo = new THREE.BufferGeometry()

    geometryOne.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verticesOne), 3));
    geometryOne.setIndex([
      0, 1, 2, 3, 0,
      4, 5, 1, 5, 6,
      2, 3, 7, 6, 5, 4, 7

    ])
    geometryTwo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verticesTwo), 3));
    geometryTwo.setIndex([
      0, 1, 2, 3, 0,
      4, 5, 1, 5, 6,
      2, 3, 7, 6, 5, 4, 7
    ])

    let tempLineMeshOne = new THREE.Line(geometryOne, new THREE.LineBasicMaterial({color: 0xFFFF00}))
    let tempLineMeshTwo = new THREE.Line(geometryTwo, new THREE.LineBasicMaterial({color: 0xFFFF00}))

    tempLineMeshOne.position.x += xPos
    tempLineMeshOne.position.y += yPos
    tempLineMeshOne.position.z -= 10

    tempLineMeshTwo.position.x += xPos
    tempLineMeshTwo.position.y += yPos
    tempLineMeshTwo.position.z -= 10

    this.lineMeshArr.push(tempLineMeshOne)
    this.lineMeshArr.push(tempLineMeshTwo)
  }
  
  //모델 초기 설정을 위한 함수(Body 구현)
  makeModelTwo(xPos, yPos, zPos) {
    let vertices = new Float32Array( [
      10, 0, 0,
      10, 5, 0,
      34, 5, 0,   
      34.5, 10, 0,
      35.5, 10, 0,
      36, 5, 0,   
      60, 5, 0,   
      60, 0, 0,
      36.5, 0, 0,
      33.5, 0, 0, 
      10, 0, 20,
      10, 5, 20,  
      34, 5, 20,  
      34.5, 10, 20,
      35.5, 10, 20,
      36, 5, 20,   
      60, 5, 20,   
      60, 0, 20,
      36.5, 0, 20, 
      33.5, 0, 20
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
      14, 13, 12, 11, 10, 0
    ])

    let tempLineMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xFFFF00}))

    tempLineMesh.position.x += xPos
    tempLineMesh.position.y += yPos
    tempLineMesh.position.z -= 10

    this.lineMeshArr.push(tempLineMesh)
  }
  
  //모델 초기 설정을 위한 함수(Gate 구현)
  makeModelThree(xPos, yPos, zPos) {
    let tempMesh = new THREE.Mesh(new THREE.BoxGeometry(20, 6, 5), new THREE.MeshBasicMaterial( {color: 0x666666} ))

    tempMesh.position.x = xPos + 35
    tempMesh.position.y = yPos + 13
    tempMesh.position.z = zPos + 2.5

    this.modelMeshArr.push(tempMesh)

    let lineMesh = new THREE.LineSegments(new THREE.EdgesGeometry(tempMesh.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))

    lineMesh.position.x = xPos + 35
    lineMesh.position.y = yPos + 13
    lineMesh.position.z = zPos + 2.5

    this.lineMeshArr.push(lineMesh)
  }
  //모델 초기 설정을 위한 함수(Channel 구현)
  makeModelFour(xPos, yPos, zPos) {
    let tempMeshOne = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 20), new THREE.MeshBasicMaterial( {color: 0xFFFFFF} ))
    let tempMeshTwo = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 20), new THREE.MeshBasicMaterial( {color: 0xFFFFFF} ))
    let tempMeshThree = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 20), new THREE.MeshBasicMaterial( {color: 0xFFFFFF} ))

    tempMeshOne.position.x = xPos + 35
    tempMeshOne.position.y = yPos + 11
    tempMeshOne.position.z = zPos + 2.5

    tempMeshTwo.position.x = xPos + 35
    tempMeshTwo.position.y = yPos + 13
    tempMeshTwo.position.z = zPos + 2.5

    tempMeshThree.position.x = xPos + 35
    tempMeshThree.position.y = yPos + 15
    tempMeshThree.position.z = zPos + 2.5

    this.modelMeshArr.push(tempMeshOne)
    this.modelMeshArr.push(tempMeshTwo)
    this.modelMeshArr.push(tempMeshThree)

    let lineMeshOne = new THREE.LineSegments(new THREE.EdgesGeometry(tempMeshOne.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))
    let lineMeshTwo = new THREE.LineSegments(new THREE.EdgesGeometry(tempMeshTwo.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))
    let lineMeshThree = new THREE.LineSegments(new THREE.EdgesGeometry(tempMeshThree.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))

    lineMeshOne.position.x = xPos + 35
    lineMeshOne.position.y = yPos + 11
    lineMeshOne.position.z = zPos + 2.5

    lineMeshTwo.position.x = xPos + 35
    lineMeshTwo.position.y = yPos + 13
    lineMeshTwo.position.z = zPos + 2.5

    lineMeshThree.position.x = xPos + 35
    lineMeshThree.position.y = yPos + 15
    lineMeshThree.position.z = zPos + 2.5

    this.lineMeshArr.push(lineMeshOne)
    this.lineMeshArr.push(lineMeshTwo)
    this.lineMeshArr.push(lineMeshThree)
  }
}

//MBCFET 클래스
class MBCFET  {
  //실행시 변수 설정
  constructor() {
    
    this.modelPos

    //MOSFET의 길이 비율
    this.widthLengthRatio = 10

    //MOSFET 모델을 도형으로 저장. 총 7개의 원소 저장
    this.modelMeshArr = []

    //MOSFET 모델을 선으로 저장. 총 7개의 원소 저장
    this.lineMeshArr = []
  }

  //모델을 나타내기 위한 초기 설정
  initModel(xPos, yPos, zPos, scene) {
    this.makeModelOne(xPos, yPos, zPos)
    this.makeModelTwo(xPos, yPos, zPos)
    this.makeModelThree(xPos, yPos, zPos)
    this.makeModelFour(xPos, yPos, zPos)

    this.modelPos = [xPos, yPos, zPos]

    for(let i = 0; i < 7; i++)  {
      this.modelMeshArr[i].material.transparent = true
      this.modelMeshArr[i].material.opacity = 0.5
      scene.add(this.modelMeshArr[i])
      scene.add(this.lineMeshArr[i])
    }
  }

  //모델 초기 설정을 위한 함수(Drain, Source을 구현)
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
      30, 10, 0,
      40, 10, 0,
      40, 5, 0,   
      60, 5, 0,   
      60, 0, 0,
      40, 0, 0,
      30, 0, 0, 
      10, 0, 20,
      10, 5, 20,  
      30, 5, 20,  
      30, 10, 20,
      40, 10, 20,
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
      14, 13, 12, 11, 10, 0
    ])

    let tempLineMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xFFFF00}))

    tempLineMesh.position.x += xPos
    tempLineMesh.position.y += yPos
    tempLineMesh.position.z -= 10

    this.lineMeshArr.push(tempLineMesh)
  }
  
  //모델 초기 설정을 위한 함수(Gate 구현)
  makeModelThree(xPos, yPos, zPos) {
    let tempMesh = new THREE.Mesh(new THREE.BoxGeometry(20, 6, 5), new THREE.MeshBasicMaterial( {color: 0x666666} ))

    tempMesh.position.x = xPos + 35
    tempMesh.position.y = yPos + 13
    tempMesh.position.z = zPos + 2.5

    this.modelMeshArr.push(tempMesh)

    let lineMesh = new THREE.LineSegments(new THREE.EdgesGeometry(tempMesh.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))

    lineMesh.position.x = xPos + 35
    lineMesh.position.y = yPos + 13
    lineMesh.position.z = zPos + 2.5

    this.lineMeshArr.push(lineMesh)
  }
  //모델 초기 설정을 위한 함수(Channel 구현)
  makeModelFour(xPos, yPos, zPos) {
    let tempMeshOne = new THREE.Mesh(new THREE.BoxGeometry(10, 1, 20), new THREE.MeshBasicMaterial( {color: 0xFFFFFF} ))
    let tempMeshTwo = new THREE.Mesh(new THREE.BoxGeometry(10, 1, 20), new THREE.MeshBasicMaterial( {color: 0xFFFFFF} ))
    let tempMeshThree = new THREE.Mesh(new THREE.BoxGeometry(10, 1, 20), new THREE.MeshBasicMaterial( {color: 0xFFFFFF} ))

    tempMeshOne.position.x = xPos + 35
    tempMeshOne.position.y = yPos + 11
    tempMeshOne.position.z = zPos + 2.5

    tempMeshTwo.position.x = xPos + 35
    tempMeshTwo.position.y = yPos + 13
    tempMeshTwo.position.z = zPos + 2.5

    tempMeshThree.position.x = xPos + 35
    tempMeshThree.position.y = yPos + 15
    tempMeshThree.position.z = zPos + 2.5

    this.modelMeshArr.push(tempMeshOne)
    this.modelMeshArr.push(tempMeshTwo)
    this.modelMeshArr.push(tempMeshThree)

    let lineMeshOne = new THREE.LineSegments(new THREE.EdgesGeometry(tempMeshOne.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))
    let lineMeshTwo = new THREE.LineSegments(new THREE.EdgesGeometry(tempMeshTwo.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))
    let lineMeshThree = new THREE.LineSegments(new THREE.EdgesGeometry(tempMeshThree.geometry), new THREE.LineBasicMaterial({color: 0xFFFF00}))

    lineMeshOne.position.x = xPos + 35
    lineMeshOne.position.y = yPos + 11
    lineMeshOne.position.z = zPos + 2.5

    lineMeshTwo.position.x = xPos + 35
    lineMeshTwo.position.y = yPos + 13
    lineMeshTwo.position.z = zPos + 2.5

    lineMeshThree.position.x = xPos + 35
    lineMeshThree.position.y = yPos + 15
    lineMeshThree.position.z = zPos + 2.5

    this.lineMeshArr.push(lineMeshOne)
    this.lineMeshArr.push(lineMeshTwo)
    this.lineMeshArr.push(lineMeshThree)
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
camera.position.set(0, 0, 40);

//무대 선언
const scene = new THREE.Scene();


//객체 정의
const newGAA = new GAAFET()
const newMBC = new MBCFET()
//모델 초기 설정
newGAA.initModel(-35, -20, -2.5, scene)
newMBC.initModel(-35, 5, -2.5, scene)

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
