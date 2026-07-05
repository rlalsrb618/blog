import tkinter as tk

# --------------------
# 상태 변수
# --------------------

running = False

open_water = 4.0
bridge_water = 4.0
bridge_temp = 8.0

time_step = 0

# --------------------
# 창
# --------------------

root = tk.Tk()
root.title("다리 밑 하천 결빙 시뮬레이션")
root.geometry("1100x750")

# --------------------
# 조절창
# --------------------

frame = tk.Frame(root)
frame.pack()

tk.Label(frame, text="다리 높이(m)").grid(row=0,column=0)

height_scale = tk.Scale(
    frame,
    from_=1,
    to=20,
    orient=tk.HORIZONTAL,
    length=250
)
height_scale.set(3)
height_scale.grid(row=0,column=1)

tk.Label(frame, text="기온(℃)").grid(row=1,column=0)

air_scale = tk.Scale(
    frame,
    from_=-20,
    to=5,
    orient=tk.HORIZONTAL,
    length=250
)
air_scale.set(-8)
air_scale.grid(row=1,column=1)

tk.Label(frame, text="유속(m/s) ×0.1").grid(row=2,column=0)

flow_scale = tk.Scale(
    frame,
    from_=0,
    to=30,
    orient=tk.HORIZONTAL,
    length=250
)
flow_scale.set(5)
flow_scale.grid(row=2,column=1)

# --------------------
# 버튼
# --------------------

button_frame = tk.Frame(root)
button_frame.pack(pady=10)

# --------------------
# 캔버스
# --------------------

canvas = tk.Canvas(
    root,
    width=1050,
    height=500,
    bg="white"
)

canvas.pack()

# --------------------
# 물 색상
# --------------------

def water_color(temp):

    if temp <= 0:
        return "#DFF6FF"

    elif temp <= 2:
        return "#66CCFF"

    else:
        return "#0066CC"

# --------------------
# 그림만 그리기
# --------------------

def draw():

    canvas.delete("all")

    bridge_height = height_scale.get()
    air_temp = air_scale.get()
    flow_speed = flow_scale.get() / 10

    hour = time_step * 0.5

    canvas.create_text(
        520,
        30,
        text=f"경과시간 : {hour:.1f} 시간",
        font=("Arial",18,"bold")
    )

    # 노출 하천

    canvas.create_text(
        250,
        80,
        text="노출된 하천",
        font=("Arial",16,"bold")
    )

    canvas.create_rectangle(
        80,180,420,320,
        fill=water_color(open_water)
    )

    canvas.create_text(
        250,
        250,
        text=f"{open_water:.2f} ℃",
        font=("Arial",22,"bold"),
        fill="white"
    )

    if open_water <= 0:

        canvas.create_text(
            250,
            290,
            text="얼음 형성",
            font=("Arial",16,"bold")
        )

    # 다리

    bridge_y = 180 - bridge_height * 5

    if bridge_y < 60:
        bridge_y = 60

    canvas.create_rectangle(
        580,
        bridge_y,
        980,
        bridge_y + 40,
        fill="gray"
    )

    canvas.create_rectangle(
        640,
        bridge_y + 40,
        680,
        320,
        fill="gray"
    )

    canvas.create_rectangle(
        860,
        bridge_y + 40,
        900,
        320,
        fill="gray"
    )

    canvas.create_rectangle(
        580,180,980,320,
        fill=water_color(bridge_water)
    )

    canvas.create_text(
        780,
        250,
        text=f"{bridge_water:.2f} ℃",
        font=("Arial",22,"bold"),
        fill="white"
    )

    canvas.create_text(
        780,
        bridge_y - 15,
        text=f"다리높이 : {bridge_height} m",
        font=("Arial",12,"bold")
    )

    canvas.create_text(
        780,
        bridge_y + 20,
        text=f"다리온도 : {bridge_temp:.1f} ℃",
        font=("Arial",12,"bold")
    )

    if bridge_water <= 0:

        canvas.create_text(
            780,
            290,
            text="얼음 형성",
            font=("Arial",16,"bold")
        )

    canvas.create_text(
        520,
        450,
        text=f"기온 {air_temp}℃   유속 {flow_speed:.1f}m/s",
        font=("Arial",16,"bold")
    )

# --------------------
# 시뮬레이션
# --------------------

def update():

    global open_water
    global bridge_water
    global bridge_temp
    global time_step

    if not running:
        return

    bridge_height = height_scale.get()

    air_temp = air_scale.get()

    flow_speed = flow_scale.get()/10

    block_factor = 1/(bridge_height+1)

    flow_effect = flow_speed * 0.003

    open_water += (air_temp-open_water)*0.010
    open_water -= 0.015
    open_water += flow_effect

    bridge_water += (air_temp-bridge_water)*0.008

    bridge_water -= 0.015*(1-block_factor)

    bridge_water += (
        bridge_temp-bridge_water
    )*(0.006 + block_factor*0.02)

    bridge_water += flow_effect

    bridge_temp += (
        air_temp-bridge_temp
    )*0.003

    time_step += 1

    draw()

    root.after(1000, update)



# --------------------
# 버튼 함수
# --------------------

def start():

    global running

    if not running:

        running = True

        update()

def stop():

    global running

    running = False

def reset():

    global open_water
    global bridge_water
    global bridge_temp
    global time_step
    global running

    running = False

    open_water = 4.0
    bridge_water = 4.0
    bridge_temp = 8.0

    time_step = 0

    draw()

# --------------------
# 버튼
# --------------------

tk.Button(
    button_frame,
    text="▶ 시작",
    width=10,
    command=start
).pack(side=tk.LEFT,padx=10)

tk.Button(
    button_frame,
    text="⏸ 정지",
    width=10,
    command=stop
).pack(side=tk.LEFT,padx=10)

tk.Button(
    button_frame,
    text="초기화",
    width=10,
    command=reset
).pack(side=tk.LEFT,padx=10)

# 처음 그림

draw()

root.mainloop()
