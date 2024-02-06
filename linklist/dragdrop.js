let carriageCount = 0;
let dragged;

document.addEventListener("DOMContentLoaded", (event) => {
  const train = document.getElementById("train");
  // สร้างฟังก์ชันเพิ่มโบกี้ใหม่
  window.addCarriage = function () {
    carriageCount++;
    const newCarriage = document.createElement("div");
    newCarriage.className = "carriage";
    newCarriage.setAttribute("draggable", true);
    newCarriage.id = "carriage" + carriageCount;
    newCarriage.textContent = "โบกี้ " + carriageCount;
    train.appendChild(newCarriage);
    addDragEvents(newCarriage);
  };
  function showCarriageCount() {
    const carriageCountElement = document.getElementById("carriage-count");
    carriageCountElement.textContent = "จำนวนโบกี้: " + carriageCount;
  }
  const addDragEvents = (item) => {
    item.addEventListener("dragstart", (e) => {
      dragged = item;
      e.dataTransfer.setData("text/plain", item.id);
    });
  };
  // สร้างฟังก์ชันเพิ่มโบกี้ใหม่
  window.addCarriage = function () {
    if (carriageCount < 15) {
      carriageCount++;
      const newCarriage = document.createElement("div");
      newCarriage.className = "carriage";
      newCarriage.setAttribute("draggable", true);
      newCarriage.id = "carriage" + carriageCount;
      newCarriage.textContent = "โบกี้ " + carriageCount;
      train.appendChild(newCarriage);
      addDragEvents(newCarriage);
      showCarriageCount(); // เรียกใช้ฟังก์ชันเพื่อแสดงจำนวนโบกี้
    } else {
      alert("จำนวนโบกี้เกินจำนวนที่กำหนด (15 โบกี้)");
    }
  };

  // จัดการกับการลากและวาง
  // (เพิ่มเหตุการณ์ dragover และ drop ตามตัวอย่างก่อนหน้า)
  train.addEventListener("dragover", (e) => {
    e.preventDefault(); // อนุญาตให้วาง
  });

  train.addEventListener("drop", (e) => {
    e.preventDefault();
    if (dragged && e.target.className === "carriage") {
      // หาโบกี้ที่อยู่ใกล้ที่สุดและวางโบกี้ที่ลากมาก่อนหรือหลัง
      const afterElement = getDragAfterElement(train, e.clientX);
      if (afterElement == null) {
        train.appendChild(dragged);
      } else {
        train.insertBefore(dragged, afterElement);
      }
    }
  });

  // ฟังก์ชันหาโบกี้ที่ควรจะวางโบกี้ที่ลากมาต่อหน้าหรือหลัง
  function getDragAfterElement(container, x) {
    const draggableElements = [
      ...container.querySelectorAll(".carriage:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
});

// เหตุการณ์ dragover และ drop สามารถเพิ่มตามตัวอย่างก่อนหน้า
