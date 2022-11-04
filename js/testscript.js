import * as THREE from 'https://unpkg.com/three@0.142.0/build/three.module';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js'

<<<<<<< HEAD
var myCanvas = document.querySelector('#canvas1')
// myCanvas.width = 560
// myCanvas.height = 315
// 이상하게 CSS에서 canvas의 width와 height이 조절되지 않아서
// 불가피하게 여기서 조절했습니다.
// canvas의 비율은 하나로 정하는 것이 좋을 듯 합니다
// 지금은 16:9비율로 고정되어있음

=======
var myCanvas = document.querySelector('canvas.three_content')
>>>>>>> 229b1d0bd36e3bba54e99e8d325155eb4893579f

//렌더 선언
const renderer = new THREE.WebGLRenderer({
    canvas: myCanvas,
    antialias: true
})

//렌더 사이즈 설정
const widthHeightRatio = myCanvas.getBoundingClientRect()
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
camera.position.z = 5






//무대 선언
const scene = new THREE.Scene();

/////////////////////////////////////////////////////////////////////////////
//코드 입력 장소


//상자 도형 선언
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

//물체의 재료 설정(기본 재료)
const material = new THREE.MeshBasicMaterial(
  //노란색으로 설정
  {color: 0xFFFF00}
)

//물체와 재료 합성
const mesh = new THREE.Mesh(boxGeometry, material)

//물체 무대에 입력
scene.add(mesh)


/////////////////////////////////////////////////////////////////////////////




new OrbitControls(camera, renderer.domElement)

//애니메이션 입력
function animate()	{
  //애니메이션 반복 코드
	requestAnimationFrame(animate)

  //렌더 업데이트
	renderer.render(scene, camera)
}

//애니메이션 시작(필수)
animate()
