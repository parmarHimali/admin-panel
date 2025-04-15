# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```

  addSubInterest: (state, action) => {
      state.subInterests = state.subInterests.map((subInt) => {
        return subInt._id == action.payload.interest_id
          ? {
              ...subInt,
              sub_interest_data: [...subInt.sub_interest_data, action.payload],
            }
          : subInt;
      });
    },
    editInterest: (state, action) => {
      state.interests = state.interests.map((interest) => {
        return interest._id == action.payload._id
          ? {
              ...interest,
              interest: action.payload.interest,
              color_code: action.payload.color_code,
            }
          : interest;
      });
      state.subInterests = state.subInterests.map((subInt) => {
        return subInt._id == action.payload._id
          ? {
              ...subInt,
              color_code: action.payload.color_code,
              interest: action.payload.interest,
            }
          : subInt;
      });
    },

    deleteSubInterest: (state, action) => {
      state.subInterests = state.subInterests.map((subInt) => {
        return subInt._id == action.payload.interest_id
          ? {
              ...subInt,
              sub_interest_data: subInt.sub_interest_data.filter((sub) => {
                return sub._id != action.payload._id;
              }),
            }
          : subInt;
      });
    },
    editSubInterest: (state, action) => {
      state.subInterests = state.subInterests.map((subInt) => {
        return subInt._id == action.payload.interest_id
          ? {
              ...subInt,
              sub_interest_data: subInt.sub_interest_data.map((sub) => {
                return sub._id == action.payload._id ? action.payload : sub;
              }),
            }
          : subInt;
      });
    },

    deleteInterest: (state, action) => {
      state.subInterests = state.subInterests.filter((subInt) => {
        return subInt._id != action.payload._id;
      });
    },
     blockSubInterest: (state, action) => {
      state.subInterests = state.subInterests.map((subInt) => {
        return subInt._id == action.payload.interest_id
          ? {
              ...subInt,
              sub_interest_data: subInt.sub_interest_data.map((sub) => {
                return sub._id == action.payload._id
                  ? { ...sub, is_block: action.payload.is_block }
                  : sub;
              }),
            }
          : subInt;
      });
    },
     addInterest: (state, action) => {
      state.interests.unshift(action.payload);
      state.subInterests.push({ ...action.payload, sub_interest_data: [] });
    },
       blockInterest: (state, action) => {
      state.subInterests = state.subInterests.map((subInt) => {
        return subInt._id == action.payload._id
          ? { ...subInt, is_block: action.payload.is_block }
          : subInt;
      });
    },
```
