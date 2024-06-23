package com.chat.app.models;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Message {

    private String name;
    private String content;
}
