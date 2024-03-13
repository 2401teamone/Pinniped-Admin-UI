const RULES = ['public', 'user', 'creator', 'admin'];

export default function ApiRules({ schema, dispatch }) {
  const rule = (operation, current) => {
    return (
      <div className="rule">
        {RULES.map((rule) => (
          <div
            key={rule}
            className={`rule-btn ${current === rule ? 'active' : ''}`}
            onClick={() =>
              dispatch({
                type: 'EDIT_RULE',
                payload: { operation, rule },
              })
            }
          >
            {rule}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="api-rules">
      <div className="get-all-rule">
        Get All Rule: {rule('getAllRule', schema.getAllRule)}
      </div>
      <div className="get-one-rule">
        Get One Rule: {rule('getOneRule', schema.getOneRule)}
      </div>
      <div className="create-rule">
        Create Rule: {rule('createRule', schema.createRule)}
      </div>
      <div className="update-rule">
        Update Rule: {rule('updateRule', schema.updateRule)}
      </div>
      <div className="delete-rule">
        Delete Rule: {rule('deleteRule', schema.deleteRule)}
      </div>
    </div>
  );
}
