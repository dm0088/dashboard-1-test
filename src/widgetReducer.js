export function widgetReducer(state, action) {
    switch (action.type) {
        case "UPDATE_WIDGET":
            return state.map((widget) =>
                widget.id === action.payload.id ? { ...widget, ...action.payload.changes } : widget
            );
        default:
            return state
    }
}