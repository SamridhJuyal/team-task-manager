import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const COLUMNS = ["todo", "in-progress", "done"];

export default function Board({ tasks, setTasks, updateStatus }) {
  const grouped = {
    todo: tasks.filter((t) => t.status === "todo"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol && source.index === destination.index) return;

    // clone current tasks
    let updatedTasks = [...tasks];

    // find dragged task
    const movedTask = updatedTasks.find((t) => t._id === draggableId);

    // update status
    movedTask.status = destCol;

    // remove from old position
    updatedTasks = updatedTasks.filter((t) => t._id !== draggableId);

    // get destination column tasks
    const destTasks = updatedTasks.filter((t) => t.status === destCol);

    // insert at correct index
    destTasks.splice(destination.index, 0, movedTask);

    // rebuild full task list
    const finalTasks = [
      ...updatedTasks.filter((t) => t.status !== destCol),
      ...destTasks,
    ];

    setTasks(finalTasks);

    // backend update
    await updateStatus(draggableId, destCol);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {COLUMNS.map((col) => (
          <Droppable droppableId={col} key={col}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded-xl min-h-[400px]"
              >
                <h3 className="font-bold mb-3 capitalize">{col}</h3>

                {grouped[col].map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-3 mb-3 rounded shadow"
                      >
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-gray-500">
                          {task.assignedTo?.name || "Unassigned"}
                        </p>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
